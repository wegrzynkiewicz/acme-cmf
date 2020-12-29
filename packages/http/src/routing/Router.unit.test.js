import {strictEqual} from 'assert';
import {fake} from 'sinon';
import {Router} from './Router';

describe('Router', () => {

    it('should run route processor with valid conditions', async () => {
        const serviceLocator = {};
        const context = {};
        const expectedResponse = {};
        const process = fake.resolves(expectedResponse);
        const router = new Router({name: 'test'});
        router.registerRoute({
            match: fake.returns(true),
            process,
        });

        const response = await router.process(serviceLocator, context);

        strictEqual(process.calledWith(serviceLocator, context), true);
        strictEqual(response, expectedResponse);
    });
});
