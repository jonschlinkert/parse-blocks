/*!
 * parse-blocks <https://github.com/jonschlinkert/parse-blocks>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var fs = require('fs');
var should = require('should');
var blocks = require('./');

function read(str) {
  return fs.readFileSync(str, 'utf8')
}

describe('should parse blocks', function () {
  it('should use the first argument in the opening block as the object key.', function () {
    var str = read('fixtures/a.txt');
    var res = blocks(str);
    res.should.have.property('definedoc');
  });

  it('should use the second argument in the opening block as the block key.', function () {
    var str = read('fixtures/a.txt');
    var res = blocks(str);
    res.definedoc.should.have.properties('foo', 'bar', 'baz');
  });

  it('should add any additional arguments to the `args` property.', function () {
    var str = read('fixtures/a.txt');
    var res = blocks(str);
    res.definedoc.foo.should.have.property('args');
    res.definedoc.foo.args.should.be.an.array;
  });

  it('should add inner content to the `content` property.', function () {
    var str = read('fixtures/a.txt');
    var res = blocks(str);
    res.definedoc.foo.should.have.property('content');
  });

  it('should support custom delimiters.', function () {
    var str = read('fixtures/b.txt');
    var res = blocks(str, {open: ['<%-', '%>'], close: ['<%/', '%>']});
    res.should.have.property('definedoc');
    res.definedoc.should.have.properties('foo', 'bar');
  });
});

// var inspect = require('util').inspect;
// console.log(inspect(blocks(read('fixtures/c.txt')), null, 10))