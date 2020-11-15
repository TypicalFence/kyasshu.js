module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        "jest/globals": true
    },
    extends: [
        "standard",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint",
        "jest"
    ],
    rules: {
        indent: [2, 4, { SwitchCase: 1 }],
        quotes: [2, "double"],
        semi: ["error", "always"],
        "space-before-function-paren": ["error", "never"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "error"
        ]
    }
};
