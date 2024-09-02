import { describe, expect, test } from "vitest";

import { buildCSPHeaders } from "../lib/buildCSPHeaders";

describe("buildCSPHeaders", () => {
  function testCSPWithConfig(
    testName: string,
    expectedCsp: string = "",
    config?: Parameters<typeof buildCSPHeaders>[0]
  ) {
    test(testName, () => {
      const builtCSPHeaders = buildCSPHeaders(config);
      builtCSPHeaders.forEach((header) => {
        expect(header.value).toBe(expectedCsp);
      });
    });
  }

  describe("production mode", () => {
    testCSPWithConfig(
      "with defaults",
      "base-uri 'none';child-src 'none';connect-src 'none';default-src 'none';font-src 'none';form-action 'none';frame-ancestors 'none';frame-src 'none';img-src 'none';manifest-src 'none';media-src 'none';object-src 'none';script-src 'none';style-src 'none';worker-src 'none';"
    );

    testCSPWithConfig("with false config", "", {
      contentSecurityPolicy: false
    });

    testCSPWithConfig(
      "with false directive",
      "child-src 'none';connect-src 'none';default-src 'none';font-src 'none';form-action 'none';frame-ancestors 'none';frame-src 'none';img-src 'none';manifest-src 'none';media-src 'none';object-src 'none' https://exmaple.com;script-src 'none';style-src 'none';worker-src 'none';navigate-to 'self';",
      {
        contentSecurityPolicy: {
          "base-uri": false,
          "navigate-to": "'self'",
          "object-src": "'none' https://exmaple.com"
        }
      }
    );

    testCSPWithConfig(
      "with report-only",
      "base-uri 'none';child-src 'none';connect-src 'none';default-src 'none';font-src 'none';form-action 'none';frame-ancestors 'none';frame-src 'none';img-src 'none';manifest-src 'none';media-src 'none';object-src 'none';script-src 'none';style-src 'none';worker-src 'none';report-to https://example.com;report-uri https://example.com;",
      {
        contentSecurityPolicy: {
          "report-uri": "https://example.com",
          reportOnly: true
        }
      }
    );
  });

  describe("development mode", () => {
    testCSPWithConfig(
      "with defaults",
      "base-uri 'none';child-src 'none';connect-src webpack://*;default-src 'none';font-src 'none';form-action 'none';frame-ancestors 'none';frame-src 'none';img-src 'none';manifest-src 'none';media-src 'none';object-src 'none';script-src 'unsafe-eval';style-src 'unsafe-inline';worker-src 'none';",
      {
        isDev: true
      }
    );

    testCSPWithConfig(
      "with customized config",
      "base-uri https://example.com;child-src 'none';connect-src webpack://*;default-src 'none';font-src 'none';form-action 'none';frame-ancestors 'none';frame-src 'none';img-src 'none';manifest-src 'none';media-src 'none';object-src 'none';script-src 'unsafe-eval';style-src 'unsafe-inline';worker-src 'none';report-to https://example.com;report-uri https://example.com;",
      {
        contentSecurityPolicy: {
          "base-uri": "https://example.com",
          "report-to": "https://example.com",
          "style-src": false
        },
        isDev: true
      }
    );
  });
});
