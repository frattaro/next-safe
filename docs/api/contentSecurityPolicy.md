## `contentSecurityPolicy`

### Default

```js
{
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
		"worker-src": "'none'"
	},
}
```

Additionally, if `isDev` is set to `true`, the following values are merged in:

```js
{
	contentSecurityPolicy: {
		"connect-src": "webpack://*",
		"script-src": "'unsafe-eval'",
		"style-src": "'unsafe-inline'"
	},
}
```

### Description

`contentSecurityPolicy` controls the `Content-Security-Policy` header. It takes an object, in which each key is a CSP directive and the value of that key is an array of sources. For example:

```js
{
	contentSecurityPolicy: {
		"img-src": ["'self'", "unsplash.com"],
	},
}
```

Note that `'self'` is in quotes. This is a CSP thing and `next-safe` does not handle it for you. The special sources (such as `'self'`, `'none'`, etc) must be wrapped in single quotes.

### Examples

#### Allow all sources from this website by default

```js
{
	contentSecurityPolicy: {
		"default-src": ["'self'"],
	},
}
```

#### Restrict the URIs that can be used in the `<base>` element

```js
{
	contentSecurityPolicy: {
		"base-uri": ["example.com", "foo.example.com", "bar.example.com"],
	},
}
```

#### Force the browser to use `https://` for all `http://` links

```js
{
	contentSecurityPolicy: {
		"upgrade-insecure-requests": [],
	},
}
```

#### Disable the `font-src` directive

```js
{
	contentSecurityPolicy: {
		"font-src": false,
	},
}
```

#### Disable CSP entirely (NOT recommended)

```js
{
	contentSecurityPolicy: false,
}
```

### `contentSecurityPolicy.reportOnly`

Setting `contentSecurityPolicy.reportOnly` to `true` will rename the `Content-Security-Policy` header to `Content-Security-Policy-Report-Only`. This is useful if you want to test your CSP without breaking your site. Make sure to also set up an endpoint to receive the reports, then set your [`contentSecurityPolicy.report-to`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-to) field to point to that endpoint.
