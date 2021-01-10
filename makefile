help:
	@echo 'Help task disabled.'

eslint:
	npx eslint .

test-unit:
	npx mocha -r esm "./packages/**/*.unit.test.js"

tsc-cjs:
	npx lerna exec --parallel --no-bail \"tsc -p tsconfig.cjs.json\"
