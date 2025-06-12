import { describe, expect, test } from "vitest";

import { buildPermissionsPolicyHeaders } from "../lib/buildPermissionsPolicyHeaders";

describe("buildPermissionsPolicyHeaders", () => {
  test("with defaults", () => {
    const result = buildPermissionsPolicyHeaders();

    expect(result).toEqual([
      {
        key: "Feature-Policy",
        value:
          "clipboard-read 'none';clipboard-write 'none';deferred-fetch 'none';gamepad 'none';language-detector 'none';language-model 'none';rewriter 'none';summarizer 'none';shared-autofill 'none';speaker-selection 'none';translator 'none';writer 'none';accelerometer 'none';ambient-light-sensor 'none';attribution-reporting 'none';autoplay 'none';battery 'none';bluetooth 'none';camera 'none';ch-ua 'none';ch-ua-arch 'none';ch-ua-bitness 'none';ch-ua-full-version 'none';ch-ua-full-version-list 'none';ch-ua-high-entropy-values 'none';ch-ua-mobile 'none';ch-ua-model 'none';ch-ua-platform 'none';ch-ua-platform-version 'none';ch-ua-wow64 'none';compute-pressure 'none';cross-origin-isolated 'none';direct-sockets 'none';display-capture 'none';encrypted-media 'none';execution-while-not-rendered 'none';execution-while-out-of-viewport 'none';fullscreen 'none';geolocation 'none';gyroscope 'none';hid 'none';identity-credentials-get 'none';idle-detection 'none';keyboard-map 'none';magnetometer 'none';mediasession 'none';microphone 'none';midi 'none';navigation-override 'none';otp-credentials 'none';payment 'none';picture-in-picture 'none';publickey-credentials-get 'none';screen-wake-lock 'none';serial 'none';sync-xhr 'none';storage-access 'none';usb 'none';web-share 'none';window-management 'none';xr-spatial-tracking 'none';"
      },
      {
        key: "Permissions-Policy",
        value:
          "clipboard-read=(),clipboard-write=(),deferred-fetch=(),gamepad=(),language-detector=(),language-model=(),rewriter=(),summarizer=(),shared-autofill=(),speaker-selection=(),translator=(),writer=(),accelerometer=(),ambient-light-sensor=(),attribution-reporting=(),autoplay=(),battery=(),bluetooth=(),camera=(),ch-ua=(),ch-ua-arch=(),ch-ua-bitness=(),ch-ua-full-version=(),ch-ua-full-version-list=(),ch-ua-high-entropy-values=(),ch-ua-mobile=(),ch-ua-model=(),ch-ua-platform=(),ch-ua-platform-version=(),ch-ua-wow64=(),compute-pressure=(),cross-origin-isolated=(),direct-sockets=(),display-capture=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=(),hid=(),identity-credentials-get=(),idle-detection=(),keyboard-map=(),magnetometer=(),mediasession=(),microphone=(),midi=(),navigation-override=(),otp-credentials=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),storage-access=(),usb=(),web-share=(),window-management=(),xr-spatial-tracking=()"
      }
    ]);
  });

  test("with custom config", () => {
    const result = buildPermissionsPolicyHeaders({
      permissionsPolicy: {
        battery: "https://trezy.dev",
        gyroscope: "*"
      },
      permissionsPolicyDirectiveSupport: [
        "proposed",
        "standard",
        "experimental"
      ]
    });

    expect(result).toEqual([
      {
        key: "Feature-Policy",
        value:
          "clipboard-read 'none';clipboard-write 'none';deferred-fetch 'none';gamepad 'none';language-detector 'none';language-model 'none';rewriter 'none';summarizer 'none';shared-autofill 'none';speaker-selection 'none';translator 'none';writer 'none';accelerometer 'none';ambient-light-sensor 'none';attribution-reporting 'none';autoplay 'none';battery https://trezy.dev;bluetooth 'none';camera 'none';ch-ua 'none';ch-ua-arch 'none';ch-ua-bitness 'none';ch-ua-full-version 'none';ch-ua-full-version-list 'none';ch-ua-high-entropy-values 'none';ch-ua-mobile 'none';ch-ua-model 'none';ch-ua-platform 'none';ch-ua-platform-version 'none';ch-ua-wow64 'none';compute-pressure 'none';cross-origin-isolated 'none';direct-sockets 'none';display-capture 'none';encrypted-media 'none';execution-while-not-rendered 'none';execution-while-out-of-viewport 'none';fullscreen 'none';geolocation 'none';gyroscope *;hid 'none';identity-credentials-get 'none';idle-detection 'none';keyboard-map 'none';magnetometer 'none';mediasession 'none';microphone 'none';midi 'none';navigation-override 'none';otp-credentials 'none';payment 'none';picture-in-picture 'none';publickey-credentials-get 'none';screen-wake-lock 'none';serial 'none';sync-xhr 'none';storage-access 'none';usb 'none';web-share 'none';window-management 'none';xr-spatial-tracking 'none';all-screens-capture 'none';browsing-topics 'none';captured-surface-control 'none';conversion-measurement 'none';digital-credentials-get 'none';focus-without-user-activation 'none';join-ad-interest-group 'none';local-fonts 'none';run-ad-auction 'none';smart-card 'none';sync-script 'none';trust-token-redemption 'none';unload 'none';vertical-scroll 'none';"
      },
      {
        key: "Permissions-Policy",
        value:
          'clipboard-read=(),clipboard-write=(),deferred-fetch=(),gamepad=(),language-detector=(),language-model=(),rewriter=(),summarizer=(),shared-autofill=(),speaker-selection=(),translator=(),writer=(),accelerometer=(),ambient-light-sensor=(),attribution-reporting=(),autoplay=(),battery=("https://trezy.dev"),bluetooth=(),camera=(),ch-ua=(),ch-ua-arch=(),ch-ua-bitness=(),ch-ua-full-version=(),ch-ua-full-version-list=(),ch-ua-high-entropy-values=(),ch-ua-mobile=(),ch-ua-model=(),ch-ua-platform=(),ch-ua-platform-version=(),ch-ua-wow64=(),compute-pressure=(),cross-origin-isolated=(),direct-sockets=(),display-capture=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=*,hid=(),identity-credentials-get=(),idle-detection=(),keyboard-map=(),magnetometer=(),mediasession=(),microphone=(),midi=(),navigation-override=(),otp-credentials=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),storage-access=(),usb=(),web-share=(),window-management=(),xr-spatial-tracking=(),all-screens-capture=(),browsing-topics=(),captured-surface-control=(),conversion-measurement=(),digital-credentials-get=(),focus-without-user-activation=(),join-ad-interest-group=(),local-fonts=(),run-ad-auction=(),smart-card=(),sync-script=(),trust-token-redemption=(),unload=(),vertical-scroll=()'
      }
    ]);
  });

  test("with false config", () => {
    const result = buildPermissionsPolicyHeaders({
      permissionsPolicy: false
    });

    expect(result).toEqual([]);
  });

  test("with alternate custom config", () => {
    const result = buildPermissionsPolicyHeaders({
      permissionsPolicy: {
        battery: "'none'",
        gyroscope: "'self'"
      }
    });

    expect(result).toEqual([
      {
        key: "Feature-Policy",
        value:
          "clipboard-read 'none';clipboard-write 'none';deferred-fetch 'none';gamepad 'none';language-detector 'none';language-model 'none';rewriter 'none';summarizer 'none';shared-autofill 'none';speaker-selection 'none';translator 'none';writer 'none';accelerometer 'none';ambient-light-sensor 'none';attribution-reporting 'none';autoplay 'none';battery 'none';bluetooth 'none';camera 'none';ch-ua 'none';ch-ua-arch 'none';ch-ua-bitness 'none';ch-ua-full-version 'none';ch-ua-full-version-list 'none';ch-ua-high-entropy-values 'none';ch-ua-mobile 'none';ch-ua-model 'none';ch-ua-platform 'none';ch-ua-platform-version 'none';ch-ua-wow64 'none';compute-pressure 'none';cross-origin-isolated 'none';direct-sockets 'none';display-capture 'none';encrypted-media 'none';execution-while-not-rendered 'none';execution-while-out-of-viewport 'none';fullscreen 'none';geolocation 'none';gyroscope 'self';hid 'none';identity-credentials-get 'none';idle-detection 'none';keyboard-map 'none';magnetometer 'none';mediasession 'none';microphone 'none';midi 'none';navigation-override 'none';otp-credentials 'none';payment 'none';picture-in-picture 'none';publickey-credentials-get 'none';screen-wake-lock 'none';serial 'none';sync-xhr 'none';storage-access 'none';usb 'none';web-share 'none';window-management 'none';xr-spatial-tracking 'none';"
      },
      {
        key: "Permissions-Policy",
        value:
          "clipboard-read=(),clipboard-write=(),deferred-fetch=(),gamepad=(),language-detector=(),language-model=(),rewriter=(),summarizer=(),shared-autofill=(),speaker-selection=(),translator=(),writer=(),accelerometer=(),ambient-light-sensor=(),attribution-reporting=(),autoplay=(),battery=(),bluetooth=(),camera=(),ch-ua=(),ch-ua-arch=(),ch-ua-bitness=(),ch-ua-full-version=(),ch-ua-full-version-list=(),ch-ua-high-entropy-values=(),ch-ua-mobile=(),ch-ua-model=(),ch-ua-platform=(),ch-ua-platform-version=(),ch-ua-wow64=(),compute-pressure=(),cross-origin-isolated=(),direct-sockets=(),display-capture=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=(self),hid=(),identity-credentials-get=(),idle-detection=(),keyboard-map=(),magnetometer=(),mediasession=(),microphone=(),midi=(),navigation-override=(),otp-credentials=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),storage-access=(),usb=(),web-share=(),window-management=(),xr-spatial-tracking=()"
      }
    ]);
  });

  test("with bad config", () => {
    expect(() => {
      buildPermissionsPolicyHeaders({
        permissionsPolicy: {
          battery: "* 'http://example.com'",
          gyroscope: "'self'"
        }
      });
    }).toThrow(
      "* is not allowed with additional values for permissions-policy directive values"
    );
  });

  test("with bad config", () => {
    expect(() => {
      buildPermissionsPolicyHeaders({
        permissionsPolicy: {
          battery: "* 'none'",
          gyroscope: "'self'"
        }
      });
    }).toThrow(
      "'none' is not allowed with additional values for permissions-policy directive values"
    );
  });
});
