## `permissionsPolicyDirectiveSupport`

### Default

```js
{
	permissionsPolicyDirectiveSupport: ["proposed", "standard"],
}
```

### Description

The `Permissions-Policy` header has had a bit of a rocky history, and as such the list of features/permissions has changed _a lot_. To help manage this, `next-safe` provides 4 different sets of directive support.

To include a list of directives, add it to the `permissionsPolicyDirectiveSupport` array. For example, to add support for experimental directives:

```js
{
	permissionsPolicyDirectiveSupport: ["proposed", "standard", "experimental"],
}
```

See this W3C documentation for more information about what directives are supported: https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md
