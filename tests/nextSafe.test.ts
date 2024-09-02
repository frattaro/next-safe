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
        key: "Feature-Policy",
        value:
          "clipboard-read 'none';clipboard-write 'none';gamepad 'none';shared-autofill 'none';speaker-selection 'none';accelerometer 'none';ambient-light-sensor 'none';autoplay 'none';battery 'none';bluetooth 'none';camera 'none';ch-ua 'none';ch-ua-arch 'none';ch-ua-bitness 'none';ch-ua-full-version 'none';ch-ua-full-version-list 'none';ch-ua-mobile 'none';ch-ua-model 'none';ch-ua-platform 'none';ch-ua-platform-version 'none';ch-ua-wow64 'none';cross-origin-isolated 'none';display-capture 'none';encrypted-media 'none';execution-while-not-rendered 'none';execution-while-out-of-viewport 'none';fullscreen 'none';geolocation 'none';gyroscope 'none';hid 'none';idle-detection 'none';keyboard-map 'none';magnetometer 'none';microphone 'none';midi 'none';navigation-override 'none';payment 'none';picture-in-picture 'none';publickey-credentials-get 'none';screen-wake-lock 'none';serial 'none';sync-xhr 'none';usb 'none';web-share 'none';window-management 'none';xr-spatial-tracking 'none';"
      },
      {
        key: "Permissions-Policy",
        value:
          "clipboard-read=(),clipboard-write=(),gamepad=(),shared-autofill=(),speaker-selection=(),accelerometer=(),ambient-light-sensor=(),autoplay=(),battery=(),bluetooth=(),camera=(),ch-ua=(),ch-ua-arch=(),ch-ua-bitness=(),ch-ua-full-version=(),ch-ua-full-version-list=(),ch-ua-mobile=(),ch-ua-model=(),ch-ua-platform=(),ch-ua-platform-version=(),ch-ua-wow64=(),cross-origin-isolated=(),display-capture=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=(),hid=(),idle-detection=(),keyboard-map=(),magnetometer=(),microphone=(),midi=(),navigation-override=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),usb=(),web-share=(),window-management=(),xr-spatial-tracking=()"
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
