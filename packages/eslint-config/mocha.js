module.exports = {
    rules: {
        'mocha/no-exclusive-tests': [
            'error',
        ],
        'mocha/no-hooks': [
            'error',
        ],
        'mocha/no-hooks-for-single-case': [
            'error',
        ],
        'mocha/no-mocha-arrows': [
            'off',
        ],
        'mocha/no-pending-tests': [
            'error',
        ],
        'mocha/no-return-from-async': [
            'error',
        ],
        'mocha/no-skipped-tests': [
            'error',
        ],
        'mocha/no-synchronous-tests': [
            'error',
        ],
        'mocha/no-top-level-hooks': [
            'error',
        ],
        'mocha/prefer-arrow-callback': [
            'error',
            {
                allowNamedFunctions: false,
                allowUnboundThis: false,
            },
        ],
    },
};
