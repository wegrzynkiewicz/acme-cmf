import type {HandlerInterface} from '../handlers/HandlerInterface';
import type {Log} from '../Log';

export class LogBus {

    private readonly handlers: HandlerInterface[];

    public constructor(
        {handlers}: {
            handlers: HandlerInterface[],
        },
    ) {
        this.handlers = [...handlers];
    }

    public dispatch(log: Log): void {
        for (const handler of this.handlers) {
            handler.handle(log);
        }
    }
}
