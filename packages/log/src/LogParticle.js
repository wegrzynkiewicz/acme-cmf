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

    onPreInitServices({config, serviceRegistry}) {
        const {stderr, stdout} = this;

        const logBus = provideLogBus({config, stderr, stdout});
        serviceRegistry.registerService('logBus', logBus);

        const loggerFactory = provideLoggerFactory({config, logBus});
        serviceRegistry.registerService('loggerFactory', loggerFactory);

        const logger = loggerFactory.produceLogger({channel: 'ROOT'});
        serviceRegistry.registerService('logger', logger);
    }
}
