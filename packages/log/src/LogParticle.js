import {provideLogBus} from './logBus/provideLogBus';
import {provideLoggerFactory} from './loggerFactory/provideLoggerFactory';

function initConfigForStream({configRegistry, name, key}) {

    configRegistry.register({
        comment: `Enabling the logging to standard ${name} steam.`,
        defaults: true,
        key: `log.${key}.enabled`,
        type: 'boolean',
    });
    configRegistry.register({
        comment: `Minimum severity level for standard ${name} stream.`,
        defaults: true,
        key: `log.${key}.min.severity`,
        type: 'boolean',
    });
}

export class LogParticle {

    constructor({stderr, stdout}) {
        this.stderr = stderr;
        this.stdout = stdout;
    }

    onInitConfig({configRegistry}) {
        configRegistry.register({
            comment: 'Enabling the logging mechanism.',
            defaults: true,
            key: 'log.enabled',
            type: 'boolean',
        });

        initConfigForStream({configRegistry, key: 'stdout', name: 'output'});
        initConfigForStream({configRegistry, key: 'stderr', name: 'error'});

        configRegistry.register({
            comment: 'Add additional tags to all loggers.',
            defaults: [],
            key: 'log.tags',
            type: 'commaSeparatedStrings',
        });
    }

    onInitServices({config, serviceRegistry}) {
        const {stderr, stdout} = this;

        const logBus = provideLogBus({config, stderr, stdout});
        serviceRegistry.registerService({
            comment: 'Processes logs received from multiple channels/loggers',
            key: 'logBus',
            service: logBus,
        });

        const loggerFactory = provideLoggerFactory({config, logBus});
        serviceRegistry.registerService({
            comment: 'Factory which produces a logger instance.',
            key: 'loggerFactory',
            service: loggerFactory,
        });

        const logger = loggerFactory.produce({channel: 'ROOT'});
        serviceRegistry.registerService({
            comment: 'Records the root logs.',
            key: 'logger',
            service: logger,
        });
    }
}
