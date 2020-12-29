import {bootstrap, CoreParticle} from '@acme/core';
import {TranslatorParticle} from '@acme/translator';
import {LogParticle} from '@acme/log';
import {ConfigParticle} from '@acme/config';
import {ConsoleParticle} from '@acme/console';
import {HTTPBaseParticle, HTTPNetworkParticle} from '@acme/http';
import {DaemonParticle} from '@acme/daemon';
import {AppParticle} from '@acme/app';
import {SchemaParticle} from '@acme/schema';
import {ShopAppParticle} from '@acme/shop-app';

(async () => {
    const {argv, env, stderr, stdin, stdout} = process;
    const {run} = bootstrap({
        particles: [
            new AppParticle(),
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

            new HTTPNetworkParticle({name: 'web'}),
            new ShopAppParticle({name: 'web'}),
        ],
    });
    process.exitCode = await run();
})();
