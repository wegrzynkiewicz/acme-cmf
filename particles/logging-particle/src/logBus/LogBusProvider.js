import {ServiceProvider} from 'acme-core-particle';
import {Filter, PlainFormatter, StreamHandler} from 'acme-logging';
import {LogBus} from './LogBus';

export class LogBusProvider extends ServiceProvider {

    constructor({name, stderr, stdout}) {
        super({name});
        this.stdout = stdout;
        this.stderr = stderr;
    }

    async provide(serviceLocator) {
        const environment = await serviceLocator.wait('environment');
        const loggingEnabled = environment.get('ACME_LOGGING_ENABLED') === '1';
        const stdoutEnabled = environment.get('ACME_LOGGING_STDOUT_ENABLED') === '1';
        const stderrEnabled = environment.get('ACME_LOGGING_STDERR_ENABLED') === '1';

        const logBus = new LogBus();

        if (loggingEnabled && stdoutEnabled) {
            const severity = environment.get('ACME_LOGGING_STDOUT_MIN_SEVERITY');
            const minSeverity = parseInt(severity, 10);
            const filter = new Filter({
                minSeverity,
            });
            const formatter = new PlainFormatter();
            const handler = new StreamHandler({
                filter,
                formatter,
                stream: this.stdout,
            });
            logBus.registerHandler(handler);
        }

        if (loggingEnabled && stderrEnabled) {
            const severity = environment.get('ACME_LOGGING_STDERR_MIN_SEVERITY');
            const minSeverity = parseInt(severity, 10);
            const filter = new Filter({
                minSeverity,
            });
            const formatter = new PlainFormatter();
            const handler = new StreamHandler({
                filter,
                formatter,
                stream: this.stderr,
            });
            logBus.registerHandler(handler);
        }

        return logBus;
    }
}
