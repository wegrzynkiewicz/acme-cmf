import {ConsoleMiddleware} from '../define/ConsoleMiddleware';
import {NullWritableStream} from '../runtime/NullWritableStream';
import {Output} from '../runtime/Output';

export class QuietDetectMiddleware extends ConsoleMiddleware {

    async execute(context, next) {
        const {input} = context;
        if (input.options.get('quiet')) {
            context.output = new Output({
                stderr: new NullWritableStream(),
                stdout: new NullWritableStream(),
            });
        }
        const exitCode = await super.execute(context, next);
        return exitCode;
    }
}
