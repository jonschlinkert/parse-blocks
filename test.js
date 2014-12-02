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
    res.definedoc.should.have.properties('aaa', 'bbb', 'ccc');
  });

  it('should add any additional arguments to the `args` property.', function () {
    var str = read('fixtures/a.txt');
    var res = blocks(str);
    res.definedoc.aaa.should.have.property('args');
    res.definedoc.aaa.args.should.be.an.array;
  });

  it('should add inner content to the `content` property.', function () {
    var str = read('fixtures/a.txt');
    var res = blocks(str);
    res.definedoc.aaa.should.have.property('content');
  });

  it('should support custom delimiters.', function () {
    var str = read('fixtures/b.txt');
    var res = blocks(str, {open: ['<%-', '%>'], close: ['<%/', '%>']});
    res.should.have.property('definedoc');
    res.definedoc.should.have.properties('aaa', 'bbb');
  });

  it('should support custom block names.', function () {
    var str = read('fixtures/d.txt');
    var res = blocks(str, {name: 'apidoc'});
    res.should.have.property('apidoc');
    res.apidoc.should.have.properties('aaa', 'bbb');
  });

  it('should use `thisArg` as the context for any arguments passed to the block.', function () {
    var ctx = {a: {name: 'AAA'}, b: {name: 'BBB'}, c: {name: 'CCC'}};
    var str = read('fixtures/d.txt');
    var res = blocks(str, {name: 'apidoc'}, ctx);

    res.should.have.property('apidoc');
    res.apidoc.should.have.properties('aaa', 'bbb', 'ccc');
    res.apidoc.aaa.context.should.eql({name: 'AAA'});
    res.apidoc.bbb.context.should.eql({name: 'BBB'});
    res.apidoc.ccc.context.should.eql({name: 'CCC'});
  });

  it('should use `options.locals` as the context for any arguments passed to the block.', function () {
    var ctx = {a: {name: 'AAA'}, b: {name: 'BBB'}, c: {name: 'CCC'}};
    var str = read('fixtures/d.txt');
    var res = blocks(str, {name: 'apidoc', locals: ctx});

    res.should.have.property('apidoc');
    res.apidoc.should.have.properties('aaa', 'bbb', 'ccc');
    res.apidoc.aaa.context.should.eql({name: 'AAA'});
    res.apidoc.bbb.context.should.eql({name: 'BBB'});
    res.apidoc.ccc.context.should.eql({name: 'CCC'});
  });

  it('should support custom block names and custom delimiter syntax.', function () {
    var str = read('fixtures/e.txt');
    var res = blocks(str, {name: 'apidoc', open: ['<%-', '%>'], close: ['<%/', '%>']});
    res.should.have.property('apidoc');
    res.apidoc.should.have.properties('aaa', 'bbb', 'ccc');
  });
});
