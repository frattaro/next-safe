import { describe, expect, test } from "vitest";

import { nextSafe } from "../lib";

describe("nextSafe", () => {
  test("empty config", () => {
    const headers = nextSafe();
    expect(headers).toEqual([
      {
        key: "Content-Security-Policy",
        value:
          "base-uri 'none';child-src 'none';connect-src 'none';default-src 'none';font-src 'none';form-action 'none';frame-ancestors 'none';frame-src 'none';img-src 'none';manifest-src 'none';media-src 'none';object-src 'none';script-src 'none';style-src 'none';worker-src 'none';"
      },
      {
        key: "Permissions-Policy",
        value:
          "autofill=(),clipboard-read=(),clipboard-write=(),deferred-fetch=(),gamepad=(),language-detector=(),language-model=(),manual-text=(),rewriter=(),speaker-selection=(),summarizer=(),translator=(),writer=(),accelerometer=(),ambient-light-sensor=(),attribution-reporting=(),autoplay=(),battery=(),bluetooth=(),camera=(),ch-ua=(),ch-ua-arch=(),ch-ua-bitness=(),ch-ua-full-version=(),ch-ua-full-version-list=(),ch-ua-high-entropy-values=(),ch-ua-mobile=(),ch-ua-model=(),ch-ua-platform=(),ch-ua-platform-version=(),ch-ua-wow64=(),compute-pressure=(),cross-origin-isolated=(),direct-sockets=(),display-capture=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=(),hid=(),identity-credentials-get=(),idle-detection=(),keyboard-map=(),magnetometer=(),mediasession=(),microphone=(),midi=(),navigation-override=(),otp-credentials=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),storage-access=(),tools=(),usb=(),web-share=(),window-management=(),xr-spatial-tracking=()"
      },
      {
        key: "Referrer-Policy",
        value: "no-referrer"
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload"
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff"
      },
      {
        key: "X-Frame-Options",
        value: "DENY"
      }
    ]);
  });

  test("false config", () => {
    const headers = nextSafe({
      contentSecurityPolicy: false,
      permissionsPolicy: false,
      referrerPolicy: false,
      strictTransportSecurity: false,
      contentTypeOptions: false,
      frameOptions: false
    });
    expect(headers).toEqual([]);
  });

  test("dev config", () => {
    const headers = nextSafe({
      contentSecurityPolicy: false,
      permissionsPolicy: false,
      referrerPolicy: false,
      contentTypeOptions: false,
      frameOptions: false,
      isDev: true
    });
    expect(headers).toEqual([]);
  });
});
