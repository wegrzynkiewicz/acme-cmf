import {provideLogBus} from './logBus/provideLogBus';
import {provideLoggerFactory} from './loggerFactory/provideLoggerFactory';

function setupConfigForStream({config, name, key}) {

    config.declare({
        comment: `Enabling the logging to standard ${name} steam.`,
        defaults: true,
        key: `log.${key}.enabled`,
        type: config.types.boolean,
    });
    config.declare({
        comment: `Minimum severity level for standard ${name} stream.`,
        defaults: true,
        key: `log.${key}.min.severity`,
        type: config.types.boolean,
    });
}

function setupVariables({config}) {

    config.declare({
        comment: 'Enabling the logging mechanism.',
        defaults: true,
        key: 'log.enabled',
        type: config.types.boolean,
    });

    setupConfigForStream({config, key: 'stdout', name: 'output'});
    setupConfigForStream({config, key: 'stderr', name: 'error'});

    config.declare({
        comment: 'Add additional tags to all loggers.',
        defaults: [],
        key: 'log.tags',
        type: config.types.commaSeparatedStrings,
    });
}

export function createLogParticle({stderr, stdout}) {
    return {
        bootstrap({stageManager}) {
            stageManager.registerStageListener('environment-setup', setupVariables);
            stageManager.registerStageListener('service-creation', ({config, serviceRegistry}) => {

                const logBus = provideLogBus({config, stderr, stdout});
                serviceRegistry.registerService('logBus', logBus);

                const loggerFactory = provideLoggerFactory({config, logBus});
                serviceRegistry.registerService('loggerFactory', loggerFactory);

                const logger = loggerFactory.produce({channel: 'ROOT'});
                serviceRegistry.registerService('logger', logger);
            });
        },
    };
}
