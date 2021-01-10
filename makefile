help:
	@echo 'Help task disabled.'

eslint:
	npx eslint .

test-unit:
	npx jest -c jest.config.js

tsc-cjs:
	npx lerna exec --parallel --no-bail \"tsc -p tsconfig.cjs.json\"
