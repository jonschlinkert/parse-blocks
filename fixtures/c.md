{{#definedoc "foo" foo.bar.baz "quuz"}}
---
msg: foo message
---
Here's some content for <%= msg %>.
{{/definedoc}}

{{#definedoc "bar" foo.bar.baz "quuz"}}
---
msg: bar message
---
Here's some content for <%= msg %>.
{{/definedoc}}
