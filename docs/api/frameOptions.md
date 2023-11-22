## `frameOptions`

### Default

`DENY`

### Description

`frameOptions` controls the value of the `X-Frame-Options` header. The `X-Frame-Options` HTTP response header can be used to indicate whether or not a browser should be allowed to render a page in a `<frame>`, `<iframe>`, `<embed>` or `<object>`. Sites can use this to avoid click-jacking attacks, by ensuring that their content is not embedded into other sites.

The added security is provided only if the user accessing the document is using a browser that supports `X-Frame-Options`.

Note: The `Content-Security-Policy` HTTP header has a `frame-ancestors` directive which obsoletes this header for supporting browsers.

Set to `false` to disable the `X-Frame-Options` header.
