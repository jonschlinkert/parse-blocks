{{#definedoc "baz" baz.quux.baz "fez"}}
---
msg: baz message
---
Here's some content for <%= msg %>.
{{/definedoc}}

{{#definedoc "quux" baz.quux.baz "fez"}}
---
msg: quux message
---
Here's some content for <%= msg %>.
{{/definedoc}}
