import * as Console from '.';

(async function start() {

    const version = '@acme-cmf/acme-console version 1.0.1 revision c2c7b22 copyright 2020';
    let logo = '';
    logo += '    __   __  __  __  ___     __  __  _  _  ___   __  __    ___\n';
    logo += '   (  ) / _)(  \\/  )(  _)   / _)/  \\( \\( )/ __) /  \\(  )  (  _)\n';
    logo += '   /__\\( (_  )    (  ) _)  ( (_( () ))  ( \\__ \\( () ))(__  ) _)\n';
    logo += '  (_)(_)\\__)(_/\\/\\_)(___)   \\__)\\__/(_)\\_)(___/ \\__/(____)(___)\n';
    logo += '\n';
    logo += version;
    logo += '\n';
    logo += '\u2550'.repeat(version.length);
    logo += '\n';

    const application = new Console.Application({
        name: './bin/console',
        payload: {
            logo,
            version,
        },
    });

    application.registerCommand(new Console.MainCommand({
        startupCommandName: 'intro',
    }));
    application.registerCommand(new Console.IntroCommand({
        provide: () => logo,
    }));
    application.registerCommand(new Console.VersionCommand({
        provide: () => version,
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
