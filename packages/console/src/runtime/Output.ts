import WritableStream = NodeJS.WritableStream;

export class Output {

    private readonly stderr: WritableStream;
    private readonly stdout: WritableStream;

    public constructor(
        {stderr, stdout}: {
            readonly stderr: WritableStream,
            readonly stdout: WritableStream,
        },
    ) {
        this.stderr = stderr;
        this.stdout = stdout;
    }

    public error(error: Error): void {
        const message = error.stack ?? '';
        this.stderr.write(`${message}\n`);
    }

    public write(line = ''): void {
        this.stdout.write(line);
    }

    public writeLine(line = ''): void {
        this.stdout.write(`${line}\n`);
    }
}
