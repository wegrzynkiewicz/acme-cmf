/* eslint-disable no-process-env */

import {ServiceLocator} from 'acme-core';
import {WardenProvider} from 'acme-core-particle';
import {ParticleManagerProvider} from './src/core/ParticleManagerProvider';

process.on('unhandledRejection', (error) => {
    throw error;
});

(async function bootstrap() {
    const serviceLocator = new ServiceLocator({});
    serviceLocator.set('process', process);
    serviceLocator.registerProvider(new ParticleManagerProvider());
    serviceLocator.registerProvider(new WardenProvider());
    const warden = await serviceLocator.wait('warden');
    await warden.init();

    const loggerFactory = await serviceLocator.wait('loggerFactory');
    const logger = loggerFactory.produce({channel: 'sql'});
}());
