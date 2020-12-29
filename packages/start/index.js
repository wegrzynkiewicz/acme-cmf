import {bootstrap, CoreParticle} from '@acme/core';
import {TranslatorParticle} from '@acme/translator';
import {LogParticle} from '@acme/log';
import {ConfigParticle} from '@acme/config';
import {ConsoleParticle} from '@acme/console';
import {HTTPBaseParticle} from '@acme/http';
import {DaemonParticle} from '@acme/daemon';
import {AppParticle} from '@acme/app';
import {SchemaParticle} from '@acme/schema';
import {ShopAppParticle} from '@acme/shop-app';
import {DBBaseParticle, DBInstanceParticle} from '@acme/database';

(async () => {
    const {argv, env, stderr, stdin, stdout} = process;
    const {run} = bootstrap({
        particles: [
            new AppParticle({name: 'main'}),
            new ConfigParticle({
                environmentVariables: env,
            }),
            new CoreParticle({process}),
            new ConsoleParticle({argv, stderr, stdin, stdout}),
            new DaemonParticle(),
            new DBBaseParticle(),
            new DBInstanceParticle({name: 'main'}),
            new HTTPBaseParticle(),
            new LogParticle({stderr, stdout}),
            new SchemaParticle(),
            new ShopAppParticle(),
            new TranslatorParticle(),
        ],
    });
    process.exitCode = await run();
})();
