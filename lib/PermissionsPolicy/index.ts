import { experimentalDirectives } from "./experimentalDirectives";
import { legacyDirectives } from "./legacyDirectives";
import { proposedDirectives } from "./proposedDirectives";
import { standardDirectives } from "./standardDirectives";

// Update by checking https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md
export const directives = {
  experimental: experimentalDirectives,
  legacy: legacyDirectives,
  proposed: proposedDirectives,
  standard: standardDirectives
};
