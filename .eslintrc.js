module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "react-hooks"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error", 
        "react-hooks/exhaustive-deps": "warn",

        // disable 'error  'React' must be in scope when using JSX'
        // after react 17
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
    }
}
