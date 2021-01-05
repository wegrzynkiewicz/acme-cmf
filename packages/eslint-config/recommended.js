module.exports = {
    rules: {
        'array-bracket-newline': [
            'error',
            'consistent',
        ],
        'array-callback-return': [
            'error',
            {
                allowImplicit: false,
                checkForEach: false,
            },
        ],
        'array-element-newline': [
            'error',
            'consistent',
        ],
        'callback-return': [
            'off',
        ],
        'class-methods-use-this': [
            'off',
        ],
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'consistent-this': [
            'off',
        ],
        'dot-location': [
            'error',
            'property',
        ],
        'func-style': [
            'error',
            'declaration',
            {
                allowArrowFunctions: true,
            },
        ],
        'function-call-argument-newline': [
            'off',
        ],
        'function-paren-newline': [
            'error',
            'consistent',
        ],
        'id-length': [
            'off',
        ],
        indent: [
            'error',
            4,
            {
                flatTernaryExpressions: false,
                ignoreComments: false,
                offsetTernaryExpressions: false,
                SwitchCase: 1,
            },
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'max-len': [
            'error',
            {
                code: 120,
            },
        ],
        'max-lines': [
            'error',
            {
                max: 500,
                skipBlankLines: true,
                skipComments: true,
            },
        ],
        'max-lines-per-function': [
            'error',
            {
                IIFEs: true,
                max: 500,
                skipBlankLines: true,
                skipComments: true,
            },
        ],
        'max-params': [
            'error',
            {
                max: 4,
            },
        ],
        'max-statements': [
            'error',
            40,
        ],
        'multiline-ternary': [
            'off',
        ],
        'no-bitwise': [
            'off',
        ],
        'no-constant-condition': [
            'error',
            {
                checkLoops: false,
            },
        ],
        'no-magic-numbers': [
            'off',
        ],
        'no-mixed-operators': [
            'off',
        ],
        'no-plusplus': [
            'off',
        ],
        'no-ternary': [
            'off',
        ],
        'no-undefined': [
            'off',
        ],
        'no-unused-vars': [
            'error',
            {
                args: 'none',
            },
        ],
        'object-curly-spacing': [
            'error',
            'never',
        ],
        'object-property-newline': [
            'error',
            {
                allowAllPropertiesOnSameLine: true,
                allowMultiplePropertiesPerLine: false,
            },
        ],
        'one-var': [
            'error',
            'never',
        ],
        'padded-blocks': [
            'off',
        ],
        'prefer-destructuring': [
            'off',
        ],
        'prefer-regex-literals': [
            'off',
        ],
        'quote-props': [
            'error',
            'as-needed',
        ],
        quotes: [
            'error',
            'single',
        ],
        'require-await': [
            'off',
        ],
        semi: [
            'error',
            'always',
        ],
        'sort-imports': [
            'off',
        ],
        'sort-keys': [
            'error',
            'asc',
            {
                caseSensitive: false,
                minKeys: 2,
                natural: true,
            },
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                asyncArrow: 'always',
                named: 'never',
            },
        ],
        strict: [
            'error',
            'never',
        ],
    },
};
