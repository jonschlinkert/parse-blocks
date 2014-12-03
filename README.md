# parse-blocks [![NPM version](https://badge.fury.io/js/parse-blocks.svg)](http://badge.fury.io/js/parse-blocks)

> Parse basic template blocks in a string, like Handlebars block expressions but returns an object. Delimiters are customizable.

## Install with [npm](npmjs.org)

```bash
npm i parse-blocks --save
```

## Run tests

```bash
npm test
```

## Usage

```js
var blocks = require('parse-blocks');
```

## Example

Given the following arbitrary blocks in `fixtures/c.txt`:

```handlebars
{{#definedoc "foo" a.b}}
This is content foo
{{/definedoc}}

{{#definedoc "bar" a.c}}
This is content bar
{{/definedoc}}

{{#definedoc "baz" a.d}}
This is content baz
{{/definedoc}}
```

The following:

```js
var str = fs.readFileSync('fixtures/c.txt', 'utf8');
console.log(blocks(str));
```

Results in:

```js
{ definedoc:
   { foo:
      { args: [ 'a.b' ],
        content: 'This is content foo',
        orig:
         [ '{{#definedoc "foo" a.b}}',
           'This is content foo',
           '{{/definedoc}}' ] },
     bar:
      { args: [ 'a.c' ],
        content: 'This is content bar',
        orig:
         [ '{{#definedoc "bar" a.c}}',
           'This is content bar',
           '{{/definedoc}}' ] },
     baz:
      { args: [ 'a.d' ],
        content: 'This is content baz',
        orig:
         [ '{{#definedoc "baz" a.d}}',
           'This is content baz',
           '{{/definedoc}}' ] } } }
```

## Context

Context can be passed as `thisArg` when three arguments are passed, and/or on `options.locals`.

**Example**

```js
blocks(str, {locals: {a: {name: 'AAA'}}});
```

And this block:

```handlebars
{{#apidoc "aaa" a}}
This is content <%= name %>
{{/apidoc}}
```

Results in the following object:

```js
{ apidoc:
   { aaa:
      { args: [ 'a' ],
        context: { name: 'AAA' },
        content: 'This is content <%= name %>',
        orig:
         [ '{{#apidoc "aaa" a}}',
           'This is content <%= name %>',
           '{{/apidoc}}' ] }
```

The `content` can now be used to pass to any template engine with `context` as locals.


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/parse-blocks/issues)

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb](https://github.com/assemble/verb) on December 02, 2014._