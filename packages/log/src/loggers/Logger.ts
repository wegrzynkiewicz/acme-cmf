import {Log} from '../Log';
import type {LogBus} from '../logBus/LogBus';
import type {LoggerInterface} from './LoggerInterface';

export class Logger implements LoggerInterface {

    public readonly channel: string;
    public readonly logBus: LogBus;
    public readonly tags: string[];

    public constructor(
        {channel, logBus, tags}: {
            channel: string,
            logBus: LogBus,
            tags: string[],
        },
    ) {
        this.channel = channel;
        this.logBus = logBus;
        this.tags = [...tags];
    }

    public emergency(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        this.log(0, message, parameters);
    }

    public alert(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        this.log(1, message, parameters);
    }

    public critical(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        this.log(2, message, parameters);
    }

    public error(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        this.log(3, message, parameters);
    }

    public warning(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        this.log(4, message, parameters);
    }

    public notice(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        this.log(5, message, parameters);
    }

    public info(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        this.log(6, message, parameters);
    }

    public debug(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        this.log(7, message, parameters);
    }

    public silly(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        this.log(8, message, parameters);
    }

    protected log(
        severity: number,
        message: string,
        parameters: Record<string, unknown> | undefined = undefined,
    ): void {
        const {channel, logBus, tags} = this;
        const log = new Log({
            channel,
            message,
            parameters,
            severity,
            tags,
        });
        logBus.dispatch(log);
    }
}
