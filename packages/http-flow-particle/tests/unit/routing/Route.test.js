import assert from 'assert';
import sinon from 'sinon';
import {Route} from '../../../src/routing/Route';

describe('Route', () => {

    it('should not match with invalid conditions', async () => {
        const routingStateContextMock = {};

        const route = new Route({
            conditions: [
                {
                    match: sinon.fake.returns(true),
                },
                {
                    match: sinon.fake.returns(false),
                },
            ],
            name: 'example-route',
            processor: {
                process: sinon.mock().never(),
            },
        });

        assert.strictEqual(route.match(routingStateContextMock), false);
    });

    it('should match with valid condition', async () => {
        const routingStateContextMock = {};

        const route = new Route({
            conditions: [
                {
                    match: sinon.fake.returns(true),
                },
                {
                    match: sinon.fake.returns(true),
                },
            ],
            name: 'example-route',
            processor: {
                process: sinon.mock().never(),
            },
        });

        assert.ok(route.match(routingStateContextMock));
    });

    it('should mutate with valid condition', async () => {
        function shift(routingStateContext) {
            assert.ok(routingStateContext);
            assert.ok(Array.isArray(routingStateContext.segments));
            routingStateContext.segments.shift();
        }

        const segments = ['example', 'segment'];
        const pushRoute = sinon.fake();
        const routingStateContextMock = {pushRoute, segments};
        const route = new Route({
            conditions: [
                {
                    match: sinon.fake.returns(true),
                    mutate: sinon.fake(shift),
                },
                {
                    match: sinon.fake.returns(true),
                    mutate: sinon.fake(shift),
                },
            ],
            name: 'example-route',
            processor: {
                process: sinon.mock().never(),
            },
        });

        route.mutate(routingStateContextMock);

        assert.strictEqual(segments.length, 0);
        assert.strictEqual(pushRoute.callCount, 1);
        assert.strictEqual(pushRoute.calledWith(route), true);
    });

    it('should run processor', async () => {
        const process = sinon.fake.resolves();
        const route = new Route({
            conditions: [],
            name: 'example-route',
            processor: {
                process,
            },
        });

        const context = {};
        await route.process(context);

        assert.strictEqual(process.callCount, 1);
        assert.strictEqual(process.calledWith(context), true);
    });

});
