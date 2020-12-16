import {bootstrap, CoreParticle} from '@acme/core';
import {TranslatorParticle} from '@acme/translator';
import {LogParticle} from '@acme/log';
import {ConfigParticle} from '@acme/config';
import {ConsoleParticle} from '@acme/console';

(async () => {
    const {argv, env, stderr, stdin, stdout} = process;
    const {run} = bootstrap({
        particles: [
            new CoreParticle({process}),
            new ConfigParticle({
                environmentVariables: env,
            }),
            new TranslatorParticle(),
            new LogParticle({stderr, stdout}),
            new ConsoleParticle({argv, stderr, stdin, stdout}),
        ],
    });
    await run();
})();
