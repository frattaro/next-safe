module.exports = {
  trailingComma: "none",
  importOrder: ["<THIRD_PARTY_MODULES>", "^[../]", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")]
};
