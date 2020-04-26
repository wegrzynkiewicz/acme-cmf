import assert from 'assert';
import {Environment, EnvironmentProvider} from '../../..';

describe('EnvironmentProvider', () => {

    it('should provide Environment', async () => {
        const environmentProvider = new EnvironmentProvider({
            name: 'environment',
            variables: {
                ONE_TEST: 'ONE_VALUE',
                TWO_TEST: 'TWO_VALUE',
            },
        });
        const serviceLocator = {};

        const environment = await environmentProvider.provide(serviceLocator);

        assert.ok(environment instanceof Environment);
        assert.strictEqual(environment.get('ONE_TEST'), 'ONE_VALUE');
        assert.strictEqual(environment.get('TWO_TEST'), 'TWO_VALUE');
        assert.throws(() => environment.get('NON_EXISTS_TEST'));
    });
});
