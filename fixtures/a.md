## License
{%= copyright() %}
Copyright (c) 2014 Fractal <contact@wearefractal.com>
{%= license() %}

***

{%= include("footer") %}


{{#definedoc "foo" a.b}}
---
msg: foo message
---
Here's some content for <%= msg %>.
{{/definedoc}}

{{#definedoc "bar" b.c}}
---
msg: bar message
---
Here's some content for <%= msg %>.
{{/definedoc}}

{{#definedoc "baz" c.d}}
---
msg: baz message
---
Here's some content for <%= msg %>.
{{/definedoc}}

{{#definedoc "fez" d.e}}
---
msg: fez message
---
Here's some content for <%= msg %>.
{{/definedoc}}