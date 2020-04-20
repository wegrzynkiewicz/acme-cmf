export default class Output {

    constructor({stderr, stdout}) {
        this.stderr = stderr;
        this.stdout = stdout;
    }

    write(line = '') {
        this.stdout.write(line);
    }

    writeLine(line = '') {
        this.stdout.write(`${line}\n`);
    }
}
