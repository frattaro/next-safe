import { CSPConfig } from "./types/CSP";
import { Header } from "./types/nextSafe";

const defaultCsp: Record<keyof Omit<CSPConfig, "reportOnly">, string[]> = {
  "base-uri": ["'none'"],
  "child-src": ["'none'"],
  "connect-src": ["'none'"],
  "default-src": ["'none'"],
  "font-src": ["'none'"],
  "form-action": ["'none'"],
  "frame-ancestors": ["'none'"],
  "frame-src": ["'none'"],
  "img-src": ["'none'"],
  "manifest-src": ["'none'"],
  "media-src": ["'none'"],
  "object-src": ["'none'"],
  "script-src": ["'none'"],
  "style-src": ["'none'"],
  "worker-src": ["'none'"],

  // optionalDirectives
  "block-all-mixed-content": [],
  "plugin-types": [],
  "prefetch-src": [],
  "navigate-to": [],
  "require-sri-for": [],
  "require-trusted-types-for": [],
  "report-to": [],
  "report-uri": [],
  sandbox: [],
  "script-src-attr": [],
  "script-src-elem": [],
  "style-src-attr": [],
  "style-src-elem": [],
  "trusted-types": [],
  "upgrade-insecure-requests": []
};

const devDirectives: Partial<typeof defaultCsp> = {
  "connect-src": ["webpack://*"],
  "script-src": ["'unsafe-eval'"],
  "style-src": ["'unsafe-inline'"]
};

const cleanDirective = (
  directive: CSPConfig[keyof typeof defaultCsp]
): string[] => {
  if (!directive) return [];

  if (Array.isArray(directive))
    return directive.map((x) => x.trim()).filter(Boolean);

  return directive
    .split(/\s+/)
    .map((x) => x.trim())
    .filter(Boolean);
};

export function buildCSPHeaders({
  contentSecurityPolicy = {},
  isDev
}: {
  contentSecurityPolicy?: CSPConfig | false;
  isDev?: boolean;
} = {}): Header[] {
  if (contentSecurityPolicy === false) {
    return [];
  }

  // modify default CSP with configured values
  const directives = Object.keys(defaultCsp).reduce<typeof defaultCsp>(
    (acc, x) => {
      if (x in contentSecurityPolicy) {
        const value: CSPConfig[keyof typeof defaultCsp] =
          contentSecurityPolicy[x];
        acc[x] = cleanDirective(value);
      }

      // concatenate development directives
      if (isDev) {
        if (x in devDirectives) {
          const value: string[] = devDirectives[x];
          acc[x] = acc[x]
            .concat(cleanDirective(value))
            .filter((y) => y !== "'none'");
        }
      }

      return acc;
    },
    { ...defaultCsp }
  );

  // reporting backwards compatibility
  const reportDirectiveValue = directives["report-to"].length
    ? directives["report-to"]
    : directives["report-uri"].length
      ? directives["report-uri"]
      : [];
  directives["report-uri"] = reportDirectiveValue;
  directives["report-to"] = reportDirectiveValue;

  const cspString = Object.entries(directives).reduce(
    (accumulator, [key, value]) => {
      if (value.length) {
        return `${accumulator}${key} ${[...new Set(value)].join(" ")};`;
      }

      return accumulator;
    },
    ""
  );

  const cspHeaderNames = [
    `Content-Security-Policy${
      contentSecurityPolicy.reportOnly ? "-Report-Only" : ""
    }`
  ];

  return cspHeaderNames.map((headerName) => ({
    key: headerName,
    value: cspString
  }));
}
