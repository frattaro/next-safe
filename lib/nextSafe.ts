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
    strictTransportSecurity
  } = options;

  return [
    ...buildCSPHeaders({ contentSecurityPolicy, isDev }),
    ...buildPermissionsPolicyHeaders({
      permissionsPolicy,
      permissionsPolicyDirectiveSupport
    }),
    makeHeaderObj("Referrer-Policy", referrerPolicy, "no-referrer"),
    makeHeaderObj(
      "Strict-Transport-Security",
      strictTransportSecurity,
      isDev ? "" : "max-age=31536000; includeSubDomains; preload"
    ),
    makeHeaderObj("X-Content-Type-Options", contentTypeOptions, "nosniff"),
    makeHeaderObj("X-Frame-Options", frameOptions, "DENY")
  ].reduce<Header[]>((a, x) => {
    if (x?.value) a.push(x); // Filter out header values that have resolved to falsy
    return a;
  }, []);
}
