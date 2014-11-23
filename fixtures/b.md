## Author
{%= include("authors", {
  authors: [
    {name: 'Jon Schlinkert', username: 'jonschlinkert'},
    {name: 'Brian Woodward', username: 'doowb'}
  ]
}) %}

## License
{%= copyright() %}
Copyright (c) 2014 Fractal <contact@wearefractal.com>
{%= license() %}

***

{%= include("footer") %}


{{#definedoc.foo}}
---
msg: foo message
---
Here's some content for <%= msg %>.
{{/definedoc}}

{{#definedoc.bar}}
---
msg: bar message
---
Here's some content for <%= msg %>.
{{/definedoc}}

{{#definedoc.baz}}
---
msg: baz message
---
Here's some content for <%= msg %>.
{{/definedoc}}

{{#definedoc.bang}}
---
msg: bang message
---
Here's some content for <%= msg %>.
{{/definedoc}}