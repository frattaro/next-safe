import { directives } from "./PermissionsPolicy";
import { Header, PermPolicyDirectiveList } from "./types/nextSafe";

function reduceDirectives(
  supportedDirectives: string[],
  permissionsPolicy: Record<string, string | false>,
  defaultValue: string
): Record<string, string> {
  return supportedDirectives.reduce((accumulator, directive) => {
    if (permissionsPolicy[directive] !== false) {
      accumulator[directive] = permissionsPolicy[directive] || defaultValue;
    }

    return accumulator;
  }, {});
}

export function buildPermissionsPolicyHeaders({
  permissionsPolicy = {},
  permissionsPolicyDirectiveSupport = ["proposed", "standard"]
}: {
  permissionsPolicy?: false | Record<string, string | false>;
  permissionsPolicyDirectiveSupport?: PermPolicyDirectiveList[] | undefined;
} = {}): Header[] {
  if (permissionsPolicy === false) {
    return [];
  }

  const supportedDirectives = Array.from(
    new Set(
      permissionsPolicyDirectiveSupport
        .map((directiveSet) => directives[directiveSet])
        .flat()
    )
  );

  const featurePolicyDirectives = reduceDirectives(
    supportedDirectives,
    permissionsPolicy,
    "'none'"
  );
  const permissionsPolicyDirectives = reduceDirectives(
    supportedDirectives,
    permissionsPolicy,
    ""
  );

  return [
    {
      key: "Feature-Policy",
      value: Object.entries(featurePolicyDirectives).reduce(
        (accumulator, [key, value]) => {
          return `${accumulator}${key} ${value};`;
        },
        ""
      )
    },
    {
      key: "Permissions-Policy",
      value: Object.entries(permissionsPolicyDirectives)
        .reduce<string[]>((accumulator, [key, value]) => {
          const serializedValues = value
            .replace(/ {2}/g, " ")
            .split(" ")
            .map((item) => {
              const quotelessValue = item
                .replace(/^['"]/, "")
                .replace(/['"]$/g, "");

              if (quotelessValue === "none") {
                return "";
              }

              if (["*", "self", ""].includes(quotelessValue)) {
                return quotelessValue;
              }

              return `"${quotelessValue}"`;
            });

          if (serializedValues.includes("") && serializedValues.length > 1) {
            throw new Error(
              "'none' is not allowed with additional values for permissions-policy directive values"
            );
          }

          if (serializedValues.includes("*") && serializedValues.length > 1) {
            throw new Error(
              "* is not allowed with additional values for permissions-policy directive values"
            );
          }

          const concatenatedValues = serializedValues.join(" ");
          accumulator.push(
            concatenatedValues === "*"
              ? `${key}=*`
              : `${key}=(${concatenatedValues})`
          );

          return accumulator;
        }, [])
        .join(",")
    }
  ];
}
