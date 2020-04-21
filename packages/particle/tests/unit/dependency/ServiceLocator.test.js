import ServiceLocator from '../../../src/dependency/ServiceLocator';
import assert from 'assert';
import sinon from 'sinon';

describe('ServiceLocator', () => {

    it('should return service using get', async () => {
        const serviceLocator = new ServiceLocator({name: 'global'});
        const exampleServiceInstance = {};
        serviceLocator.set('exampleServiceName', exampleServiceInstance);

        const resultInstance = serviceLocator.get('exampleServiceName');

        assert.strictEqual(resultInstance, exampleServiceInstance);
        assert.strictEqual(serviceLocator.has('exampleServiceName'), true);
    });

    it('should return service using wait', async () => {
        const serviceLocator = new ServiceLocator({name: 'global'});
        const exampleServiceInstance = {};
        serviceLocator.set('exampleServiceName', exampleServiceInstance);

        const resultInstance = await serviceLocator.wait('exampleServiceName');

        assert.strictEqual(resultInstance, exampleServiceInstance);
        assert.strictEqual(serviceLocator.has('exampleServiceName'), true);
    });

    it('should return service using get when parent contain instance', async () => {
        const parentServiceLocator = new ServiceLocator({name: 'parent'});
        const childServiceLocator = new ServiceLocator({
            name: 'child',
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
        const parentServiceLocator = new ServiceLocator({name: 'parent'});
        const childServiceLocator = new ServiceLocator({
            name: 'child',
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
        const parentServiceLocator = new ServiceLocator({name: 'parent'});
        const childServiceLocator = new ServiceLocator({
            name: 'child',
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
        const parentServiceLocator = new ServiceLocator({name: 'parent'});
        const childServiceLocator = new ServiceLocator({
            name: 'child',
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
        const parentServiceLocator = new ServiceLocator({name: 'parent'});
        const childServiceLocator = new ServiceLocator({
            name: 'child',
            parent: parentServiceLocator,
        });
        const childServiceInstance = {};
        childServiceLocator.set('exampleServiceName', childServiceInstance);

        assert.throws(() => parentServiceLocator.get('exampleServiceName'));
    });

    it('should return service using wait then provider exists', async () => {
        const serviceLocator = new ServiceLocator({
            name: 'global',
        });
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
        const parentServiceLocator = new ServiceLocator({name: 'parent'});
        const childServiceLocator = new ServiceLocator({
            name: 'child',
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
        const parentServiceLocator = new ServiceLocator({name: 'parent'});
        const childServiceLocator = new ServiceLocator({
            name: 'child',
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

    it('should return promise using wait before register chain of dependencies', async () => {
        const parentServiceLocator = new ServiceLocator({name: 'parent'});
        const childServiceLocator = new ServiceLocator({
            name: 'child',
            parent: parentServiceLocator,
        });
        const parentAlphaServiceInstance = {};
        const parentAlphaServiceProvider = {
            name: 'service-alpha',
            provide: sinon.fake.resolves(parentAlphaServiceInstance),
        };
        const clientBetaServiceInstance = {};
        const clientBetaServiceProvider = {
            name: 'service-beta',
            provide: async (serviceLocator) => {
                await serviceLocator.wait('service-alpha');
                return clientBetaServiceInstance;
            },
        };
        const parentGammaServiceInstance = {};
        const parentGammaServiceProvider = {
            name: 'service-gamma',
            provide: async (serviceLocator) => {
                await serviceLocator.wait('service-beta');
                return parentGammaServiceInstance;
            },
        };

        const promise = childServiceLocator.wait('service-gamma');
        parentServiceLocator.registerProvider(parentGammaServiceProvider);
        parentServiceLocator.registerProvider(clientBetaServiceProvider);
        parentServiceLocator.registerProvider(parentAlphaServiceProvider);
        const resultService = await promise;

        assert.strictEqual(resultService, parentGammaServiceInstance);
    });
});
