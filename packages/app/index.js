import {bootstrap} from '@acme/core';
import {createTranslatorParticle} from '@acme/translator';
import {createLogParticle} from '@acme/log';
import {createConfigParticle} from '@acme/config';

(async () => {
    process.on('unhandledRejection', (error) => {
        throw error;
    });
    const {env, stderr, stdout} = process;
    const {run} = bootstrap({
        particles: [
            createConfigParticle({
                environmentVariables: env,
            }),
            createTranslatorParticle(),
            createLogParticle({stderr, stdout}),
        ],
    });
    await run();
})();
