'use strict';

var _ = require('lodash');
var fs = require('fs');
var inspect = require('util').inspect;
var blocks = require('./');


function read(str) {
  return fs.readFileSync(str, 'utf8')
}

var str = read('fixtures/d.txt');
var ctx = {a: {name: 'AAA'}, b: {name: 'BBB'}, c: {name: 'CCC'}};
var res = blocks(str, {name: 'apidoc'}, ctx);

console.log(inspect(res, null, 10))
_.forIn(res.apidoc, function (value, key) {
  value.content = _.template(value.content, value.context);
});



// console.log(inspect(blocks(read('fixtures/d.txt')), null, 10));
// console.log(inspect(blocks(read('fixtures/e.txt'), {name: 'apidoc', open: ['<%-', '%>'], close: ['<%/', '%>']}), null, 10));


