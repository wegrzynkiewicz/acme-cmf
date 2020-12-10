import {bootstrap} from '@acme/core';
import {TranslatorParticle} from '@acme/translator';
import {LogParticle} from '@acme/log';
import {ConfigParticle} from '@acme/config';

(async () => {
    process.on('unhandledRejection', (error) => {
        throw error;
    });
    const {env, stderr, stdout} = process;
    const {run} = bootstrap({
        particles: [
            new ConfigParticle({
                environmentVariables: env,
            }),
            new TranslatorParticle(),
            new LogParticle({stderr, stdout}),
        ],
    });
    await run();
})();
