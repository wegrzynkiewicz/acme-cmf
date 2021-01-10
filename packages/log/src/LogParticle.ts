import type {Writable} from 'stream';
import type {ParticleInterface, ServiceRegistry} from '@acme/service';
import type {ConfigRegistry} from '../../config/src/ConfigRegistry';
import {provideLogBus} from './logBus/provideLogBus';
import {provideLoggerFactory} from './loggerFactory/provideLoggerFactory';

function initConfigForStream(
    {configRegistry, name, key}: {
        configRegistry: ConfigRegistry,
        name: string,
        key: string,
    },
): void {

    configRegistry.registerEntry({
        comment: `Enabling the logging to standard ${name} steam.`,
        defaults: true,
        key: `log.${key}.enabled`,
        type: 'boolean',
    });
    configRegistry.registerEntry({
        comment: `Minimum severity level for standard ${name} stream.`,
        defaults: true,
        key: `log.${key}.min.severity`,
        type: 'boolean',
    });
}

export class LogParticle implements ParticleInterface {

    private readonly stderr: Writable;
    private readonly stdout: Writable;

    public constructor(
        {stderr, stdout}: {
            stderr: Writable,
            stdout: Writable,
        },
    ) {
        this.stderr = stderr;
        this.stdout = stdout;
    }

    public async onInitConfig(
        {configRegistry}: {
            configRegistry: ConfigRegistry,
        },
    ): Promise<void> {
        configRegistry.registerEntry({
            comment: 'Enabling the logging mechanism.',
            defaults: true,
            key: 'log.enabled',
            type: 'boolean',
        });

        initConfigForStream({configRegistry, key: 'stdout', name: 'output'});
        initConfigForStream({configRegistry, key: 'stderr', name: 'error'});

        configRegistry.registerEntry({
            comment: 'Add additional tags to all loggers.',
            defaults: [],
            key: 'log.tags',
            type: 'commaSeparatedStrings',
        });
    }


    public async onPreInitServices(
        {config, serviceRegistry}: {
            config: Map<string, unknown>,
            serviceRegistry: ServiceRegistry,
        },
    ): Promise<void> {
        const {stderr, stdout} = this;

        const logBus = provideLogBus({config, stderr, stdout});
        serviceRegistry.registerService('logBus', logBus);

        const loggerFactory = provideLoggerFactory({config, logBus});
        serviceRegistry.registerService('loggerFactory', loggerFactory);

        const logger = loggerFactory.produceLogger({channel: 'ROOT'});
        serviceRegistry.registerService('logger', logger);
    }
}
