## `strictTransportSecurity`

### Default

`max-age=31536000; includeSubDomains; preload`

if `isDev` is `true`, the header is not used.

### Description

`strictTransportSecurity` controls the `Strict-Transport-Security` header. The HTTP Strict-Transport-Security response header (often abbreviated as HSTS) informs browsers that the site should only be accessed using HTTPS, and that any future attempts to access it using HTTP should automatically be converted to HTTPS.

Set to `false` to disable the `Strict-Transport-Security` header.
