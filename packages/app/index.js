import {bootstrap, CoreParticle} from '@acme/core';
import {TranslatorParticle} from '@acme/translator';
import {LogParticle} from '@acme/log';
import {ConfigParticle} from '@acme/config';
import {ConsoleParticle} from '@acme/console';
import {HTTPBaseParticle, HTTPNetworkParticle} from '@acme/http';
import {DaemonParticle} from '@acme/daemon';
import {ApplicationsParticle} from '@acme/applications';
import {SchemaParticle} from '@acme/schema';
import {ShopApplicationParticle} from '@acme/shop-application';

(async () => {
    const {argv, env, stderr, stdin, stdout} = process;
    const {run} = bootstrap({
        particles: [
            new ApplicationsParticle(),
            new CoreParticle({process}),
            new ConfigParticle({
                environmentVariables: env,
            }),
            new TranslatorParticle(),
            new LogParticle({stderr, stdout}),
            new ConsoleParticle({argv, stderr, stdin, stdout}),
            new DaemonParticle(),
            new HTTPBaseParticle(),
            new SchemaParticle(),

            new HTTPNetworkParticle({name: 'shop'}),
            new ShopApplicationParticle(),
        ],
    });
    process.exitCode = await run();
})();
