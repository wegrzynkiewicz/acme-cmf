export class Log {

    public readonly channel: string;
    public readonly message: string;
    public readonly parameters?: Record<string, unknown>;
    public readonly severity: number;
    public readonly tags: string[];
    public readonly time: Date;

    public constructor(
        {channel, message, parameters, severity, tags}: {
            channel: string,
            message: string,
            parameters?: Record<string, unknown>,
            severity: number,
            tags: string[],
        },
    ) {
        if (isNaN(severity) || severity < 0 || severity > 8) {
            throw new Error('Invalid log severity passed.');
        }
        this.channel = channel;
        this.message = message;
        this.parameters = parameters;
        this.severity = severity;
        this.tags = tags;
        this.time = new Date();
    }
}
