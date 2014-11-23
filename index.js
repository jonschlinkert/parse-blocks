/*!
 * sections <https://github.com/jonschlinkert/sections>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var _ = require('lodash');
var get = require('get-value');

var a = /\{\{#([^\\}]*(?:\\.[^\\}]*)*)\}\}/g;
var b = /\{\{\/([^\\}]*(?:\\.[^\\}]*)*)\}\}/g;

var parser = module.exports = function parser(str, locals) {
  str = str.replace(/\r/g, '');

  var lines = str.split(/\n/);
  var len = lines.length;
  var i = 0;

  var name = 'definedoc';
  var stats = {};
  stats[name] = {};

  var isBlock = false;
  var cache = {};
  var match;
  var n;

  while (i < len) {
    var line = lines[i++];
    var o;

    if (match = a.exec(line)) {
      isBlock = true;
      o = {};

      var props = match[1].split(' ').filter(Boolean);

      // remove the helper name from the props array
      props.shift();
      // get the template key
      n = JSON.parse(props[0]);
      // remove the template key from the props
      props.shift();

      if (/\./.test(props[0])) {
        props = get(locals, props[0]);
      }

      o = {};
      o.locals = props;
      o.content = [];
      o.orig = [];
    }

    if (Boolean(line) && isBlock) {
      o.content.push(line);
      o.orig.push(line);
    }

    if (b.exec(line)) {
      o.content.shift();
      o.content.pop();
      o.content = o.content.join('\n');
      isBlock = false;
    }

    cache[n] = o;
  }

  stats[name] = cache;
  return stats;
};

var ctx = {
  a: {b: {msg: 'one'}},
  b: {c: {msg: 'two'}},
  c: {d: {msg: 'three'}},
  d: {e: {msg: 'four'}}
};

var matter = require('gray-matter');
var aaa = parser(fs.readFileSync('fixtures/a.md', 'utf8'), ctx);

var template = _.reduce(aaa, function (res, v, k) {
  res[k] = _.reduce(v, function (acc, value, key) {
    if (value && value.content) {
      var res = matter(value.content);
      acc[key] = _.omit(_.extend({}, value, res), 'lang');
    }
    return acc;
  }, {});
  return res;
}, {});

// var ccc = parser(fs.readFileSync('fixtures/c.md', 'utf8'));
// var ddd = parser(fs.readFileSync('fixtures/d.md', 'utf8'));

console.log(template);
// console.log(aaa.definedoc.bar);
// console.log(ccc);
// console.log(ddd);
