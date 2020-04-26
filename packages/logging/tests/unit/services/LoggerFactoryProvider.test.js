import assert from 'assert';
import sinon from 'sinon';
import {LoggerFactory, LoggerFactoryProvider} from '../../..';

describe('LoggerFactoryProvider', () => {
    it('should return service using get', async () => {
        const environment = {
            get: sinon.stub(),
        };
        environment.get.withArgs('ACME_LOGGING_ENABLED').returns('1');
        environment.get.withArgs('ACME_LOGGING_ADDITIONAL_TAGS').returns('prod,example-tag');
        const logBus = {};
        const serviceLocator = {
            wait: sinon.stub(),
        };
        serviceLocator.wait.withArgs('environment').resolves(environment);
        serviceLocator.wait.withArgs('logBus').resolves(logBus);

        const loggerFactoryProvider = new LoggerFactoryProvider({
            name: 'loggerFactory',
        });
        const loggerFactory = await loggerFactoryProvider.provide(serviceLocator);

        assert.ok(loggerFactory instanceof LoggerFactory);
    });
});
