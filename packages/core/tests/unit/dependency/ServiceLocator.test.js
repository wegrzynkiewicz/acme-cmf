import assert from 'assert';
import sinon from 'sinon';
import {ServiceLocator} from '../../..';

describe('ServiceLocator', () => {

    it('should return service using get', async () => {
        const serviceLocator = new ServiceLocator({});
        const exampleServiceInstance = {};
        serviceLocator.set('exampleServiceName', exampleServiceInstance);

        const resultInstance = serviceLocator.get('exampleServiceName');

        assert.strictEqual(resultInstance, exampleServiceInstance);
        assert.strictEqual(serviceLocator.has('exampleServiceName'), true);
    });

    it('should return service using wait', async () => {
        const serviceLocator = new ServiceLocator({});
        const exampleServiceInstance = {};
        serviceLocator.set('exampleServiceName', exampleServiceInstance);

        const resultInstance = await serviceLocator.wait('exampleServiceName');

        assert.strictEqual(resultInstance, exampleServiceInstance);
        assert.strictEqual(serviceLocator.has('exampleServiceName'), true);
    });

    it('should return service using get when parent contain instance', async () => {
        const parentServiceLocator = new ServiceLocator({});
        const childServiceLocator = new ServiceLocator({
            parent: parentServiceLocator,
        });
        const exampleServiceInstance = {};
        parentServiceLocator.set('exampleServiceName', exampleServiceInstance);

        const resultInstance = childServiceLocator.get('exampleServiceName');

        assert.strictEqual(resultInstance, exampleServiceInstance);
        assert.strictEqual(childServiceLocator.has('exampleServiceName'), true);
        assert.strictEqual(parentServiceLocator.has('exampleServiceName'), true);
    });

    it('should return service using wait when parent contain instance', async () => {
        const parentServiceLocator = new ServiceLocator({});
        const childServiceLocator = new ServiceLocator({
            parent: parentServiceLocator,
        });
        const exampleServiceInstance = {};
        parentServiceLocator.set('exampleServiceName', exampleServiceInstance);

        const resultInstance = await childServiceLocator.wait('exampleServiceName');

        assert.strictEqual(resultInstance, exampleServiceInstance);
        assert.strictEqual(childServiceLocator.has('exampleServiceName'), true);
        assert.strictEqual(parentServiceLocator.has('exampleServiceName'), true);
    });

    it('should return own service using get when parent contain other instance', async () => {
        const parentServiceLocator = new ServiceLocator({});
        const childServiceLocator = new ServiceLocator({
            parent: parentServiceLocator,
        });
        const parentServiceInstance = {};
        parentServiceLocator.set('exampleServiceName', parentServiceInstance);
        const childServiceInstance = {};
        childServiceLocator.set('exampleServiceName', childServiceInstance);

        const childResultInstance = childServiceLocator.get('exampleServiceName');
        const parentResultInstance = parentServiceLocator.get('exampleServiceName');

        assert.strictEqual(childResultInstance, childServiceInstance);
        assert.strictEqual(parentResultInstance, parentServiceInstance);
        assert.strictEqual(childServiceLocator.has('exampleServiceName'), true);
        assert.strictEqual(parentServiceLocator.has('exampleServiceName'), true);
    });

    it('should return own service using wait when parent contain other instance', async () => {
        const parentServiceLocator = new ServiceLocator({});
        const childServiceLocator = new ServiceLocator({
            parent: parentServiceLocator,
        });
        const parentServiceInstance = {};
        parentServiceLocator.set('exampleServiceName', parentServiceInstance);
        const childServiceInstance = {};
        childServiceLocator.set('exampleServiceName', childServiceInstance);

        const childResultInstance = await childServiceLocator.wait('exampleServiceName');
        const parentResultInstance = await parentServiceLocator.wait('exampleServiceName');

        assert.strictEqual(childResultInstance, childServiceInstance);
        assert.strictEqual(parentResultInstance, parentServiceInstance);
        assert.strictEqual(childServiceLocator.has('exampleServiceName'), true);
        assert.strictEqual(parentServiceLocator.has('exampleServiceName'), true);
    });

    it('should throw error when get then only child contain instance', async () => {
        const parentServiceLocator = new ServiceLocator({});
        const childServiceLocator = new ServiceLocator({
            parent: parentServiceLocator,
        });
        const childServiceInstance = {};
        childServiceLocator.set('exampleServiceName', childServiceInstance);

        assert.throws(() => parentServiceLocator.get('exampleServiceName'));
    });

    it('should return service using wait then provider exists', async () => {
        const serviceLocator = new ServiceLocator({});
        const serviceInstance = {};
        const serviceProvider = {
            name: 'exampleServiceName',
            provide: sinon.fake.resolves(serviceInstance),
        };

        serviceLocator.registerProvider(serviceProvider);
        const resultService = await serviceLocator.wait('exampleServiceName');

        assert.strictEqual(resultService, serviceInstance);
    });

    it('should return service using wait then parent provider exists', async () => {
        const parentServiceLocator = new ServiceLocator({});
        const childServiceLocator = new ServiceLocator({
            parent: parentServiceLocator,
        });
        const parentServiceInstance = {};
        const parentServiceProvider = {
            name: 'exampleServiceName',
            provide: sinon.fake.resolves(parentServiceInstance),
        };

        parentServiceLocator.registerProvider(parentServiceProvider);
        const resultService = await childServiceLocator.wait('exampleServiceName');

        assert.strictEqual(resultService, parentServiceInstance);
    });

    it('should return promise using wait before register parent provider', async () => {
        const parentServiceLocator = new ServiceLocator({});
        const childServiceLocator = new ServiceLocator({
            parent: parentServiceLocator,
        });
        const parentServiceInstance = {};
        const parentServiceProvider = {
            name: 'exampleServiceName',
            provide: sinon.fake.resolves(parentServiceInstance),
        };

        const promise = childServiceLocator.wait('exampleServiceName');
        parentServiceLocator.registerProvider(parentServiceProvider);
        const resultService = await promise;

        assert.strictEqual(resultService, parentServiceInstance);
    });

    it('should return promise using double wait before register parent provider', async () => {
        const parentServiceLocator = new ServiceLocator({});
        const childServiceLocator = new ServiceLocator({
            parent: parentServiceLocator,
        });
        const parentServiceInstance = {};
        const parentServiceProvider = {
            name: 'exampleServiceName',
            provide: sinon.fake.resolves(parentServiceInstance),
        };

        const promise1 = childServiceLocator.wait('exampleServiceName');
        const promise2 = childServiceLocator.wait('exampleServiceName');
        parentServiceLocator.registerProvider(parentServiceProvider);
        const result1Service = await promise1;
        const result2Service = await promise2;

        assert.strictEqual(result1Service, parentServiceInstance);
        assert.strictEqual(result2Service, parentServiceInstance);
    });

    it('should return promise using wait before register chain of dependencies', async () => {
        const parentServiceLocator = new ServiceLocator({});
        const childServiceLocator = new ServiceLocator({
            name: 'child',
            parent: parentServiceLocator,
        });
        const parentAlphaServiceInstance = {};
        const parentAlphaServiceProvider = {
            name: 'service-alpha',
            provide: sinon.fake.resolves(parentAlphaServiceInstance),
        };
        const parentBetaServiceInstance = {};
        const parentBetaServiceProvider = {
            name: 'service-beta',
            provide: async (serviceLocator) => {
                await serviceLocator.wait('service-alpha');
                return parentBetaServiceInstance;
            },
        };
        const clientGammaServiceInstance = {};
        const clientGammaServiceProvider = {
            name: 'service-gamma',
            provide: async (serviceLocator) => {
                await serviceLocator.wait('service-beta');
                return clientGammaServiceInstance;
            },
        };

        const promise = childServiceLocator.wait('service-gamma');
        childServiceLocator.registerProvider(clientGammaServiceProvider);
        parentServiceLocator.registerProvider(parentAlphaServiceProvider);
        parentServiceLocator.registerProvider(parentBetaServiceProvider);
        const resultService = await promise;

        assert.strictEqual(resultService, clientGammaServiceInstance);
        assert.strictEqual(parentServiceLocator.promises.size, 0);
        assert.strictEqual(parentServiceLocator.resolvers.size, 0);
        assert.strictEqual(parentServiceLocator.services.size, 2);
        assert.strictEqual(childServiceLocator.promises.size, 0);
        assert.strictEqual(childServiceLocator.resolvers.size, 0);
        assert.strictEqual(childServiceLocator.services.size, 1);
    });

    it('should return child service promise using wait then child has own provider', async () => {
        const parentServiceLocator = new ServiceLocator({});
        const childServiceLocator = new ServiceLocator({
            parent: parentServiceLocator,
        });
        const parentServiceInstance = {};
        const parentServiceProvider = {
            name: 'exampleServiceName',
            provide: sinon.fake.resolves(parentServiceInstance),
        };
        const childServiceInstance = {};
        const childServiceProvider = {
            name: 'exampleServiceName',
            provide: sinon.fake.resolves(childServiceInstance),
        };

        parentServiceLocator.registerProvider(parentServiceProvider);
        childServiceLocator.registerProvider(childServiceProvider);
        const parentPromise = parentServiceLocator.wait('exampleServiceName');
        const childPromise = childServiceLocator.wait('exampleServiceName');
        const parentResultService = await parentPromise;
        const childResultService = await childPromise;

        assert.strictEqual(parentResultService, parentServiceInstance);
        assert.strictEqual(childResultService, childServiceInstance);
        assert.strictEqual(parentServiceLocator.promises.size, 0);
        assert.strictEqual(parentServiceLocator.resolvers.size, 0);
        assert.strictEqual(parentServiceLocator.services.size, 1);
        assert.strictEqual(childServiceLocator.promises.size, 0);
        assert.strictEqual(childServiceLocator.resolvers.size, 0);
        assert.strictEqual(childServiceLocator.services.size, 1);
    });

    it('should return service using wait then ancestor provider exists', async () => {
        const ancestorServiceLocator = new ServiceLocator({});
        const parentServiceLocator = new ServiceLocator({
            parent: ancestorServiceLocator,
        });
        const childServiceLocator = new ServiceLocator({
            parent: parentServiceLocator,
        });
        const ancestorServiceInstance = {};
        const ancestorServiceProvider = {
            name: 'exampleServiceName',
            provide: sinon.fake.resolves(ancestorServiceInstance),
        };

        ancestorServiceLocator.registerProvider(ancestorServiceProvider);
        const resultService = await childServiceLocator.wait('exampleServiceName');

        assert.strictEqual(resultService, ancestorServiceInstance);
        assert.strictEqual(ancestorServiceLocator.providers.size, 0);
        assert.strictEqual(ancestorServiceLocator.promises.size, 0);
        assert.strictEqual(ancestorServiceLocator.resolvers.size, 0);
        assert.strictEqual(ancestorServiceLocator.services.size, 1);
        assert.strictEqual(parentServiceLocator.providers.size, 0);
        assert.strictEqual(parentServiceLocator.promises.size, 0);
        assert.strictEqual(parentServiceLocator.resolvers.size, 0);
        assert.strictEqual(parentServiceLocator.services.size, 0);
        assert.strictEqual(childServiceLocator.providers.size, 0);
        assert.strictEqual(childServiceLocator.promises.size, 0);
        assert.strictEqual(childServiceLocator.resolvers.size, 0);
        assert.strictEqual(childServiceLocator.services.size, 0);
    });
});
