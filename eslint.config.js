import typescriptEslint from "typescript-eslint";

export default typescriptEslint.config({
  rules: {
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "vue/multi-word-component-names": "off",
    "vue/first-attribute-linebreak": "off",
  },
});
