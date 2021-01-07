const {resolve} = require('path');

module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: resolve(__dirname, './tsconfig.cjs.json'),
        },
    },
    transform: {'.+\\.ts?$': 'ts-jest'},
    testEnvironment: 'node',
    testRegex: [
        '.*\\.(test|spec)?\\.(ts|tsx)$',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
