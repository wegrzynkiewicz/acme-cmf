import Output from './Output';

export default class RuntimeContext {

    constructor({application, args, argv, options, output, stdin, stderr, stdout, usagePrinter}) {
        this.application = application;
        this.args = args;
        this.argv = argv;
        this.options = options;
        this.output = output;
        this.stdin = stdin;
        this.stderr = stderr;
        this.stdout = stdout;
        this.output = new Output({
            application,
            stderr,
            stdout,
        });
        this.usagePrinter = usagePrinter;
    }
}
