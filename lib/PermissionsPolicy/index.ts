import { experimentalDirectives } from "./experimentalDirectives";
import { legacyDirectives } from "./legacyDirectives";
import { proposedDirectives } from "./proposedDirectives";
import { standardDirectives } from "./standardDirectives";

// Update by checking https://www.permissionspolicy.com
export const directives = {
  experimental: experimentalDirectives,
  legacy: legacyDirectives,
  proposed: proposedDirectives,
  standard: standardDirectives
};
