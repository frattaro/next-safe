import { describe, expect, test } from "@jest/globals";

import { buildPermissionsPolicyHeaders } from "../lib/buildPermissionsPolicyHeaders";

describe("buildPermissionsPolicyHeaders", () => {
  test("with defaults", () => {
    const result = buildPermissionsPolicyHeaders();

    expect(result).toEqual([
      {
        key: "Feature-Policy",
        value:
          "clipboard-read 'none';clipboard-write 'none';gamepad 'none';shared-autofill 'none';speaker-selection 'none';accelerometer 'none';ambient-light-sensor 'none';autoplay 'none';battery 'none';bluetooth 'none';camera 'none';ch-ua 'none';ch-ua-arch 'none';ch-ua-bitness 'none';ch-ua-full-version 'none';ch-ua-full-version-list 'none';ch-ua-mobile 'none';ch-ua-model 'none';ch-ua-platform 'none';ch-ua-platform-version 'none';ch-ua-wow64 'none';cross-origin-isolated 'none';display-capture 'none';encrypted-media 'none';execution-while-not-rendered 'none';execution-while-out-of-viewport 'none';fullscreen 'none';geolocation 'none';gyroscope 'none';hid 'none';idle-detection 'none';keyboard-map 'none';magnetometer 'none';microphone 'none';midi 'none';navigation-override 'none';payment 'none';picture-in-picture 'none';publickey-credentials-get 'none';screen-wake-lock 'none';serial 'none';sync-xhr 'none';usb 'none';web-share 'none';window-management 'none';xr-spatial-tracking 'none';"
      },
      {
        key: "Permissions-Policy",
        value:
          "clipboard-read=(),clipboard-write=(),gamepad=(),shared-autofill=(),speaker-selection=(),accelerometer=(),ambient-light-sensor=(),autoplay=(),battery=(),bluetooth=(),camera=(),ch-ua=(),ch-ua-arch=(),ch-ua-bitness=(),ch-ua-full-version=(),ch-ua-full-version-list=(),ch-ua-mobile=(),ch-ua-model=(),ch-ua-platform=(),ch-ua-platform-version=(),ch-ua-wow64=(),cross-origin-isolated=(),display-capture=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=(),hid=(),idle-detection=(),keyboard-map=(),magnetometer=(),microphone=(),midi=(),navigation-override=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),usb=(),web-share=(),window-management=(),xr-spatial-tracking=()"
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
          "clipboard-read 'none';clipboard-write 'none';gamepad 'none';shared-autofill 'none';speaker-selection 'none';accelerometer 'none';ambient-light-sensor 'none';autoplay 'none';battery https://trezy.dev;bluetooth 'none';camera 'none';ch-ua 'none';ch-ua-arch 'none';ch-ua-bitness 'none';ch-ua-full-version 'none';ch-ua-full-version-list 'none';ch-ua-mobile 'none';ch-ua-model 'none';ch-ua-platform 'none';ch-ua-platform-version 'none';ch-ua-wow64 'none';cross-origin-isolated 'none';display-capture 'none';encrypted-media 'none';execution-while-not-rendered 'none';execution-while-out-of-viewport 'none';fullscreen 'none';geolocation 'none';gyroscope *;hid 'none';idle-detection 'none';keyboard-map 'none';magnetometer 'none';microphone 'none';midi 'none';navigation-override 'none';payment 'none';picture-in-picture 'none';publickey-credentials-get 'none';screen-wake-lock 'none';serial 'none';sync-xhr 'none';usb 'none';web-share 'none';window-management 'none';xr-spatial-tracking 'none';browsing-topics 'none';conversion-measurement 'none';focus-without-user-activation 'none';join-ad-interest-group 'none';local-fonts 'none';run-ad-auction 'none';sync-script 'none';trust-token-redemption 'none';unload 'none';vertical-scroll 'none';"
      },
      {
        key: "Permissions-Policy",
        value:
          'clipboard-read=(),clipboard-write=(),gamepad=(),shared-autofill=(),speaker-selection=(),accelerometer=(),ambient-light-sensor=(),autoplay=(),battery=("https://trezy.dev"),bluetooth=(),camera=(),ch-ua=(),ch-ua-arch=(),ch-ua-bitness=(),ch-ua-full-version=(),ch-ua-full-version-list=(),ch-ua-mobile=(),ch-ua-model=(),ch-ua-platform=(),ch-ua-platform-version=(),ch-ua-wow64=(),cross-origin-isolated=(),display-capture=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=*,hid=(),idle-detection=(),keyboard-map=(),magnetometer=(),microphone=(),midi=(),navigation-override=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),usb=(),web-share=(),window-management=(),xr-spatial-tracking=(),browsing-topics=(),conversion-measurement=(),focus-without-user-activation=(),join-ad-interest-group=(),local-fonts=(),run-ad-auction=(),sync-script=(),trust-token-redemption=(),unload=(),vertical-scroll=()'
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
          "clipboard-read 'none';clipboard-write 'none';gamepad 'none';shared-autofill 'none';speaker-selection 'none';accelerometer 'none';ambient-light-sensor 'none';autoplay 'none';battery 'none';bluetooth 'none';camera 'none';ch-ua 'none';ch-ua-arch 'none';ch-ua-bitness 'none';ch-ua-full-version 'none';ch-ua-full-version-list 'none';ch-ua-mobile 'none';ch-ua-model 'none';ch-ua-platform 'none';ch-ua-platform-version 'none';ch-ua-wow64 'none';cross-origin-isolated 'none';display-capture 'none';encrypted-media 'none';execution-while-not-rendered 'none';execution-while-out-of-viewport 'none';fullscreen 'none';geolocation 'none';gyroscope 'self';hid 'none';idle-detection 'none';keyboard-map 'none';magnetometer 'none';microphone 'none';midi 'none';navigation-override 'none';payment 'none';picture-in-picture 'none';publickey-credentials-get 'none';screen-wake-lock 'none';serial 'none';sync-xhr 'none';usb 'none';web-share 'none';window-management 'none';xr-spatial-tracking 'none';"
      },
      {
        key: "Permissions-Policy",
        value:
          "clipboard-read=(),clipboard-write=(),gamepad=(),shared-autofill=(),speaker-selection=(),accelerometer=(),ambient-light-sensor=(),autoplay=(),battery=(),bluetooth=(),camera=(),ch-ua=(),ch-ua-arch=(),ch-ua-bitness=(),ch-ua-full-version=(),ch-ua-full-version-list=(),ch-ua-mobile=(),ch-ua-model=(),ch-ua-platform=(),ch-ua-platform-version=(),ch-ua-wow64=(),cross-origin-isolated=(),display-capture=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=(self),hid=(),idle-detection=(),keyboard-map=(),magnetometer=(),microphone=(),midi=(),navigation-override=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),usb=(),web-share=(),window-management=(),xr-spatial-tracking=()"
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
