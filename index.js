/*!
 * sections <https://github.com/jonschlinkert/sections>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var get = require('get-value');
var typeOf = require('kind-of');

var a = /\{\{#([^\\}]*(?:\\.[^\\}]*)*)\}\}/g;
var b = /\{\{\/([^\\}]*(?:\\.[^\\}]*)*)\}\}/g;

var parser = module.exports = function parser(str, fn) {
  str = str.replace(/\r/g, '');

  var lines = str.split(/\n/);
  var len = lines.length;
  var i = 0;
  var j = 0;

  var name = 'definedoc';
  var isBlock = false;
  var cache = {};
  var stats = {};
  var match;

  while (i < len) {
    var line = lines[i++];

    if (match = a.exec(line)) {
      isBlock = true;

      var context = {};
      var args = match[1].split(' ').filter(Boolean);
      if (typeof fn === 'function') {
        context = fn(args);
      }

      cache[j] = {};
      cache[j].args = args;
      cache[j].context = context;
      cache[j].content = [];
      cache[j].orig = [];
      cache[j].lines = 0;
    }

    if (Boolean(line) && isBlock) {
      if (cache[j].lines !== 0) {
        cache[j].content.push(line);
      }
      cache[j].orig.push(line);
      cache[j].lines++;
    }

    if (b.exec(line)) {
      cache[j].content.pop();
      cache[j].content = cache[j].content.join('\n');
      isBlock = false;
      j++;
    }
  }

  stats.orig = cache;
  return stats;
};

var cache = {
  foo: 'this is <%= foo %>',
  bar: 'this is <%= bar %>',
  baz: 'this is <%= baz %>',
  fez: 'this is <%= fez %>'
};

var context = {
  a: {b: {foo: 'one', bar: 'two', baz: 'three', fez: 'four'}}
};

var aaa = parser(fs.readFileSync('fixtures/a.md', 'utf8'), function(args) {
  // console.log(args)
  return args.reduce(function (acc, arg, i) {
    console.log(i)
    if (/\./.test(arg)) {
      acc = acc.concat(get(context, arg));
    } else {
      acc = acc.concat(arg);
    }
    return acc;
  }, []);
});

var ccc = parser(fs.readFileSync('fixtures/c.md', 'utf8'));
var ddd = parser(fs.readFileSync('fixtures/d.md', 'utf8'));

console.log(aaa.orig);
// console.log(ccc);
// console.log(ddd);