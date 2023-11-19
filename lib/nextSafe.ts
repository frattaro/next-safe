import { buildCSPHeaders } from "./buildCSPHeaders";
import { buildPermissionsPolicyHeaders } from "./buildPermissionsPolicyHeaders";
import { Header, NextSafeConfig } from "./types/nextSafe";

function makeHeaderObj(
  key: string,
  value: string | false | undefined,
  defaultValue: string
): Header | undefined {
  if (value === false) {
    return undefined;
  }

  return {
    key,
    value: value || defaultValue
  };
}

export function nextSafe(options: NextSafeConfig = {}): Header[] {
  const {
    contentTypeOptions,
    contentSecurityPolicy = {},
    frameOptions,
    permissionsPolicy = {},
    permissionsPolicyDirectiveSupport,
    isDev = false,
    referrerPolicy,
    xssProtection
  } = options;

  return [
    ...buildCSPHeaders({ contentSecurityPolicy, isDev }),
    ...buildPermissionsPolicyHeaders({
      permissionsPolicy,
      permissionsPolicyDirectiveSupport
    }),
    makeHeaderObj("Referrer-Policy", referrerPolicy, "no-referrer"),
    makeHeaderObj("X-Content-Type-Options", contentTypeOptions, "nosniff"),
    makeHeaderObj("X-Frame-Options", frameOptions, "DENY"),
    makeHeaderObj("X-XSS-Protection", xssProtection, "1; mode=block")
  ].filter(<T>(x?: T): x is T => Boolean(x)); // Filter out header values that have resolved to falsy
}
