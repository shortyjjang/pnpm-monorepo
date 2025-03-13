module.exports = { 
  root: true, 
  extends: [
    "@react-native", 
    "plugin:@typescript-eslint/recommended"
  ], 
  parser: "@typescript-eslint/parser", 
  plugins: ["@typescript-eslint"], 
  parserOptions: { 
    requireConfigFile: false 
  },
  rules: {
    "no-trailing-spaces": "off",
    "@typescript-eslint/no-var-requires": "off"
  }
};
