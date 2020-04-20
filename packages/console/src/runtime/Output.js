export default class Output {

    constructor({stderr, stdout}) {
        this.stderr = stderr;
        this.stdout = stdout;
    }

    error(error) {
        const message = (error || '').stack;
        this.stderr.write(`${message}\n`);
    }

    write(line = '') {
        this.stdout.write(line);
    }

    writeLine(line = '') {
        this.stdout.write(`${line}\n`);
    }
}
