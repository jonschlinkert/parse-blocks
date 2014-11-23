## License
{%= copyright() %}
Copyright (c) 2014 Fractal <contact@wearefractal.com>
{%= license() %}

***

{%= include("footer") %}


{{#definedoc "foo" a.b.foo}}
---
msg: foo message
---
Here's some content for <%= msg %>.
{{/definedoc}}

{{#definedoc "bar" a.b.bar}}
---
msg: bar message
---
Here's some content for <%= msg %>.
{{/definedoc}}

{{#definedoc "baz" a.b.baz}}
---
msg: baz message
---
Here's some content for <%= msg %>.
{{/definedoc}}

{{#definedoc "fez" a.b.fez}}
---
msg: fez message
---
Here's some content for <%= msg %>.
{{/definedoc}}