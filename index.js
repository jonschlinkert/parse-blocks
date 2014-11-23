/*!
 * parse-blocks <https://github.com/jonschlinkert/parse-blocks>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var delims = require('delimiter-regex');
var extend = require('extend-shallow');

module.exports = function(str, options) {
  var opts = extend({open: ['{{#', '}}'], close: ['{{/', '}}']}, options);
  str = str.replace(/\r/g, '');

  var lines = str.split(/\n/);
  var len = lines.length;
  var i = 0;

  var name = 'definedoc';
  var a = delims(opts.open);
  var b = delims(opts.close);

  var stats = {};
  stats[name] = {};

  var isBlock = false;
  var cache = {};
  var match;

  while (i < len) {
    var line = lines[i++];
    var o, n;

    if (match = a.exec(line)) {
      isBlock = true;
      o = {};
      var props = match[1].split(' ').filter(Boolean);
      // remove the helper name from the props array
      props.shift();
      // get the template key
      n = JSON.parse(props[0]);
      cache[n] = {};

      // remove the template key from the props
      props.shift();

      // If `locals` is passed, resolve object paths
      if (opts.locals && /\./.test(props[0])) {
        var get = require('get-value');
        props = get(opts.locals, props[0]);
      }

      cache[n].args = props;
      cache[n].content = [];
      cache[n].orig = [];
    }

    if (Boolean(line) && isBlock) {
      cache[n].content.push(line);
      cache[n].orig.push(line);
    }

    if (b.exec(line)) {
      cache[n].content.shift();
      cache[n].content.pop();
      cache[n].content = cache[n].content.join('\n');
      isBlock = false;
    }

    stats[name] = cache;
  }
  return stats;
};
