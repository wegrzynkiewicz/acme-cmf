import {strictEqual} from 'assert';
import {fake, mock} from 'sinon';
import {Route} from './Route';

describe('Route', () => {

    it('should not match with invalid conditions', async () => {
        const routingStateContextMock = {};

        const route = new Route({
            conditions: [
                {
                    match: fake.returns(true),
                },
                {
                    match: fake.returns(false),
                },
            ],
            processor: {
                process: mock().never(),
            },
        });

        strictEqual(route.match(routingStateContextMock), false);
    });

    it('should match with valid condition', async () => {
        const routingStateContextMock = {};

        const route = new Route({
            conditions: [
                {
                    match: fake.returns(true),
                },
                {
                    match: fake.returns(true),
                },
            ],
            processor: {
                process: mock().never(),
            },
        });

        strictEqual(route.match(routingStateContextMock), true);
    });

    it('should run processor', async () => {
        const process = fake.resolves();
        const route = new Route({
            conditions: [],
            processor: {
                process,
            },
        });

        const context = {};
        await route.process(context);

        strictEqual(process.callCount, 1);
        strictEqual(process.calledWith(context), true);
    });

});
