import {ConsoleBasicApplication} from '..';

(async function start() {

    const version = '@acme/acme-console version 1.0.1 revision c2c7b22 copyright 2020';

    const application = new ConsoleBasicApplication({
        name: './bin/console',
        payload: {},
        provideLogo: () => logo,
        provideVersion: () => version,
    });

    const exitCode = await application.run({
        argv: process.argv.slice(2),
        commandName: 'main',
        stderr: process.stderr,
        stdin: process.stdin,
        stdout: process.stdout,
    });

    // eslint-disable-next-line no-process-exit
    process.exit(exitCode);
}());
