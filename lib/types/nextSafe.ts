import { CSPConfig } from "./CSP";

export interface Header {
  key: string;
  value: string;
}

export type HeaderConfig = string | false;

export type PermPolicyDirectiveList =
  | "experimental"
  | "legacy"
  | "proposed"
  | "standard";

export interface NextSafeConfig {
  contentTypeOptions?: HeaderConfig;
  contentSecurityPolicy?: CSPConfig | false;
  frameOptions?: HeaderConfig;
  permissionsPolicy?: Record<string, string | false> | false;
  permissionsPolicyDirectiveSupport?: PermPolicyDirectiveList[];
  isDev?: boolean;
  referrerPolicy?: HeaderConfig;
  strictTransportSecurity?: HeaderConfig;
}
