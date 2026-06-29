import { describe, expect, test } from "vitest";

import { buildPermissionsPolicyHeaders } from "../lib/buildPermissionsPolicyHeaders";

describe("buildPermissionsPolicyHeaders", () => {
  test("with defaults", () => {
    const result = buildPermissionsPolicyHeaders();

    expect(result).toEqual([
      {
        key: "Permissions-Policy",
        value:
          "autofill=(),clipboard-read=(),clipboard-write=(),deferred-fetch=(),gamepad=(),language-detector=(),language-model=(),manual-text=(),rewriter=(),speaker-selection=(),summarizer=(),translator=(),writer=(),accelerometer=(),ambient-light-sensor=(),attribution-reporting=(),autoplay=(),battery=(),bluetooth=(),camera=(),ch-ua=(),ch-ua-arch=(),ch-ua-bitness=(),ch-ua-full-version=(),ch-ua-full-version-list=(),ch-ua-high-entropy-values=(),ch-ua-mobile=(),ch-ua-model=(),ch-ua-platform=(),ch-ua-platform-version=(),ch-ua-wow64=(),compute-pressure=(),cross-origin-isolated=(),direct-sockets=(),display-capture=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=(),hid=(),identity-credentials-get=(),idle-detection=(),keyboard-map=(),magnetometer=(),mediasession=(),microphone=(),midi=(),navigation-override=(),otp-credentials=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),storage-access=(),tools=(),usb=(),web-share=(),window-management=(),xr-spatial-tracking=()"
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
        key: "Permissions-Policy",
        value:
          'autofill=(),clipboard-read=(),clipboard-write=(),deferred-fetch=(),gamepad=(),language-detector=(),language-model=(),manual-text=(),rewriter=(),speaker-selection=(),summarizer=(),translator=(),writer=(),accelerometer=(),ambient-light-sensor=(),attribution-reporting=(),autoplay=(),battery=("https://trezy.dev"),bluetooth=(),camera=(),ch-ua=(),ch-ua-arch=(),ch-ua-bitness=(),ch-ua-full-version=(),ch-ua-full-version-list=(),ch-ua-high-entropy-values=(),ch-ua-mobile=(),ch-ua-model=(),ch-ua-platform=(),ch-ua-platform-version=(),ch-ua-wow64=(),compute-pressure=(),cross-origin-isolated=(),direct-sockets=(),display-capture=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=*,hid=(),identity-credentials-get=(),idle-detection=(),keyboard-map=(),magnetometer=(),mediasession=(),microphone=(),midi=(),navigation-override=(),otp-credentials=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),storage-access=(),tools=(),usb=(),web-share=(),window-management=(),xr-spatial-tracking=(),all-screens-capture=(),browsing-topics=(),captured-surface-control=(),conversion-measurement=(),digital-credentials-create=(),digital-credentials-get=(),focus-without-user-activation=(),join-ad-interest-group=(),local-fonts=(),monetization=(),run-ad-auction=(),smart-card=(),sync-script=(),trust-token-redemption=(),unload=(),vertical-scroll=()'
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
        key: "Permissions-Policy",
        value:
          "autofill=(),clipboard-read=(),clipboard-write=(),deferred-fetch=(),gamepad=(),language-detector=(),language-model=(),manual-text=(),rewriter=(),speaker-selection=(),summarizer=(),translator=(),writer=(),accelerometer=(),ambient-light-sensor=(),attribution-reporting=(),autoplay=(),battery=(),bluetooth=(),camera=(),ch-ua=(),ch-ua-arch=(),ch-ua-bitness=(),ch-ua-full-version=(),ch-ua-full-version-list=(),ch-ua-high-entropy-values=(),ch-ua-mobile=(),ch-ua-model=(),ch-ua-platform=(),ch-ua-platform-version=(),ch-ua-wow64=(),compute-pressure=(),cross-origin-isolated=(),direct-sockets=(),display-capture=(),encrypted-media=(),execution-while-not-rendered=(),execution-while-out-of-viewport=(),fullscreen=(),geolocation=(),gyroscope=(self),hid=(),identity-credentials-get=(),idle-detection=(),keyboard-map=(),magnetometer=(),mediasession=(),microphone=(),midi=(),navigation-override=(),otp-credentials=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),storage-access=(),tools=(),usb=(),web-share=(),window-management=(),xr-spatial-tracking=()"
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
