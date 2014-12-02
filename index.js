/*!
 * parse-blocks <https://github.com/jonschlinkert/parse-blocks>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var delims = require('delimiter-regex');
var extend = require('extend-shallow');

module.exports = function blocks(str, options, thisArg) {
  var opts = extend({open: ['{{#', '}}'], close: ['{{/', '}}']}, options);
  var ctx = extend({}, opts.locals, thisArg);
  opts.name = opts.name || 'definedoc';

  str = str.replace(/\r/g, '');
  var lines = str.split(/\n/);
  var len = lines.length;
  var i = 0;

  var a = delims(opts.open);
  var b = delims(opts.close);

  var stats = {};
  stats[opts.name] = {};

  var isBlock = false;
  var context = {};
  var cache = {};
  var match;

  while (i < len) {
    var line = lines[i++];
    var n;

    if (match = a.exec(line)) {
      isBlock = true;
      var props = match[1].split(' ').filter(Boolean);
      // remove the helper name from the props array
      props.shift();
      // get the template key
      n = JSON.parse(props[0]);
      cache[n] = {};

      // remove the template key from the props
      props.shift();

      // If `thisArg` is passed, resolve any values from object paths
      if (Object.keys(ctx).length > 0) {
        var get = require('get-value');

        if (ctx.hasOwnProperty(props[0])) {
          context = ctx[props[0]];
        } else {
          context = get(ctx, props[0]) || {};
        }
      }

      cache[n].args = props;
      cache[n].context = context;
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

    stats[opts.name] = cache;
  }

  return stats;
};
