import type {LoggerInterface} from './LoggerInterface';

export class NullLogger implements LoggerInterface {

    public emergency(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        // nothing
    }

    public alert(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        // nothing
    }

    public critical(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        // nothing
    }

    public error(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        // nothing
    }

    public warning(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        // nothing
    }

    public notice(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        // nothing
    }

    public info(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        // nothing
    }

    public debug(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        // nothing
    }

    public silly(message: string, parameters: Record<string, unknown> | undefined = undefined): void {
        // nothing
    }
}
