## Configuration

`next-safe` allows you to configure every header that it generates. Config options may be set to `false` to remove the feature. Here are the default values for all config options.

```js
nextSafe({
  contentTypeOptions: "nosniff",
  contentSecurityPolicy: {
    "base-uri": "'none'",
    "child-src": "'none'",
    "connect-src": "'none'",
    "default-src": "'none'",
    "font-src": "'none'",
    "form-action": "'none'",
    "frame-ancestors": "'none'",
    "frame-src": "'none'",
    "img-src": "'none'",
    "manifest-src": "'none'",
    "media-src": "'none'",
    "object-src": "'none'",
    "prefetch-src": "'none'",
    "script-src": "'none'",
    "style-src": "'none'",
    "worker-src": "'none'",
    reportOnly: false
  },
  frameOptions: "DENY",
  isDev: false,
  permissionsPolicy: {},
  permissionsPolicyDirectiveSupport: ["proposed", "standard"],
  referrerPolicy: "no-referrer",
  strictTransportSecurity: isDev
    ? false
    : "max-age=31536000; includeSubDomains; preload"
});
```

For more information on each of these options, check out their documentation:

- [`contentSecurityPolicy`](./api/contentSecurityPolicy.md)
- [`contentTypeOptions`](./api/contentTypeOptions.md)
- [`frameOptions`](./api/frameOptions.md)
- [`isDev`](./api/isDev.md)
- [`permissionsPolicy`](./api/permissionsPolicy.md)
- [`permissionsPolicyDirectiveSupport`](./api/permissionsPolicyDirectiveSupport.md)
- [`referrerPolicy`](./api/referrerPolicy.md)
- [`strictTransportSecurity`](./api/strictTransportSecurity.md)
