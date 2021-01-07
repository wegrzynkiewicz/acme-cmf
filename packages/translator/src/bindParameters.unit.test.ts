import {assert} from 'chai';
import {bindParameters} from './bindParameters';

describe('bindParameters', () => {

    it('should bind single parameter to string', async () => {
        const actual = bindParameters('Hello {var}', {var: 'World!'});

        const expected = 'Hello World!';

        assert.strictEqual(actual, expected);
    });

    it('should bind many parameters to string', async () => {
        const actual = bindParameters('Hello {var}, {lang} is {var}', {lang: 'JS', var: 'World!'});

        const expected = 'Hello World!, JS is World!';

        assert.strictEqual(actual, expected);
    });
});
