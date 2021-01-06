import {AppParticle} from '@acme/app';
import {ConfigParticle} from '@acme/config';
import {ConsoleParticle} from '@acme/console';
import {bootstrap, CoreParticle} from '@acme/core';
import {DaemonParticle} from '@acme/daemon';
import {DBBaseParticle, DBInstanceParticle} from '@acme/database';
import {HTTPBaseParticle} from '@acme/http';
import {LogParticle} from '@acme/log';
import {SchemaParticle} from '@acme/schema';
import {ShopAppParticle} from '@acme/shop-app';
import {TranslatorParticle} from '@acme/translator';

(async () => {
    const {argv, env, stderr, stdin, stdout} = process;
    const {run} = bootstrap({
        particles: [
            new AppParticle({name: 'main'}),
            new ConfigParticle({
                environmentVariables: env,
            }),
            new CoreParticle({process}),
            new ConsoleParticle({
                argv,
                setExitCode: (exitCode) => process.exitCode = exitCode,
                stderr,
                stdin,
                stdout,
            }),
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
    await run();
})();
