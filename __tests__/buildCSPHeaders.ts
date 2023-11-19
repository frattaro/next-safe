// Local imports
import { describe, expect, test } from "@jest/globals";

import { buildCSPHeaders } from "../lib/buildCSPHeaders";

// Local constants
const DEFAULT_CSP = {
  "base-uri": "'none'",
  "child-src": "'none'",
  "connect-src": "'self'",
  "default-src": "'self'",
  "font-src": "'self'",
  "form-action": "'self'",
  "frame-ancestors": "'none'",
  "frame-src": "'none'",
  "img-src": "'self'",
  "manifest-src": "'self'",
  "media-src": "'self'",
  "object-src": "'none'",
  "prefetch-src": "'self'",
  "script-src": "'self'",
  "style-src": "'self'",
  "worker-src": "'self'"
};

describe("buildCSPHeaders", () => {
  function testCSPWithConfig(testName: string, config?: any) {
    test(testName, () => {
      const builtCSPHeaders = buildCSPHeaders(config);

      if (config?.contentSecurityPolicy === false) {
        expect(builtCSPHeaders).toEqual([]);
        return;
      }

      const testCsp = config?.contentSecurityPolicy || {};
      const expectedCSP = {
        ...DEFAULT_CSP,
        ...testCsp
      };

      for (const key in testCsp) {
        if (testCsp[key] === false) delete expectedCSP[key];
      }

      if (config?.isDev) {
        if (!config.contentSecurityPolicy?.["connect-src"]) {
          expectedCSP["connect-src"] = [
            expectedCSP["connect-src"],
            "webpack://*"
          ]
            .filter(Boolean)
            .join(" ");
        }

        if (!config.contentSecurityPolicy?.["script-src"]) {
          expectedCSP["script-src"] = [
            expectedCSP["script-src"],
            "'unsafe-eval'"
          ]
            .filter(Boolean)
            .join(" ");
        }

        if (!config.contentSecurityPolicy?.["style-src"]) {
          expectedCSP["style-src"] = [
            expectedCSP["style-src"],
            "'unsafe-inline'"
          ]
            .filter(Boolean)
            .join(" ");
        }
      }

      expect(builtCSPHeaders).toBeInstanceOf(Array);
      expect(builtCSPHeaders).toHaveLength(3);

      builtCSPHeaders.forEach((header) => {
        Object.entries(expectedCSP).forEach(([key, value]) => {
          expect(header.value).toContain(`${key} ${value};`);
        });
      });
    });
  }

  describe("production mode", () => {
    testCSPWithConfig("with defaults");

    testCSPWithConfig("with false config", {
      contentSecurityPolicy: false
    });

    testCSPWithConfig("with false directive", {
      contentSecurityPolicy: {
        "base-uri": false,
        "navigate-to": "'self'",
        "object-src": "'none' https://exmaple.com"
      }
    });

    test("with report-only", () => {
      const builtCSPHeaders = buildCSPHeaders({
        contentSecurityPolicy: {
          "report-uri": "https://example.com",
          reportOnly: true
        }
      });

      expect(builtCSPHeaders).toEqual([
        {
          key: "Content-Security-Policy-Report-Only",
          value:
            "base-uri 'none';child-src 'none';connect-src 'self';default-src 'self';font-src 'self';form-action 'self';frame-ancestors 'none';frame-src 'none';img-src 'self';manifest-src 'self';media-src 'self';object-src 'none';prefetch-src 'self';script-src 'self';style-src 'self';worker-src 'self';report-uri https://example.com;report-to https://example.com;"
        },
        {
          key: "X-Content-Security-Policy-Report-Only",
          value:
            "base-uri 'none';child-src 'none';connect-src 'self';default-src 'self';font-src 'self';form-action 'self';frame-ancestors 'none';frame-src 'none';img-src 'self';manifest-src 'self';media-src 'self';object-src 'none';prefetch-src 'self';script-src 'self';style-src 'self';worker-src 'self';report-uri https://example.com;report-to https://example.com;"
        },
        {
          key: "X-WebKit-CSP",
          value:
            "base-uri 'none';child-src 'none';connect-src 'self';default-src 'self';font-src 'self';form-action 'self';frame-ancestors 'none';frame-src 'none';img-src 'self';manifest-src 'self';media-src 'self';object-src 'none';prefetch-src 'self';script-src 'self';style-src 'self';worker-src 'self';report-uri https://example.com;report-to https://example.com;"
        }
      ]);
    });
  });

  describe("development mode", () => {
    testCSPWithConfig("with defaults", {
      isDev: true
    });

    testCSPWithConfig("with customized config", {
      contentSecurityPolicy: {
        "base-uri": "https://trezy.com"
      },
      isDev: true
    });

    testCSPWithConfig("with customized config", {
      contentSecurityPolicy: {
        "style-src": false
      },
      isDev: true
    });
  });
});
