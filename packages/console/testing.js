import * as Console from '.';

(async function start() {

    const application = new Console.Application({
        name: './bin/console',
        payload: {},
    });

    application.registerCommand(new Console.MainCommand({startupCommandName: 'list'}));
    application.registerCommand(new Console.VersionCommand({
        provide() {
            return Promise.resolve('0.0.0');
        },
    }));
    application.registerCommand(new Console.HelpCommand());
    application.registerCommand(new Console.ListCommand());

    await application.run({
        argv: process.argv.slice(2),
        startupCommandName: 'main',
        stderr: process.stderr,
        stdin: process.stdin,
        stdout: process.stdout,
    });
}());
