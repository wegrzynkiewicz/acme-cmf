import ConsoleMiddleware from '../define/ConsoleMiddleware';
import NullWriteableStream from '../runtime/NullWritableStream';
import Output from '../runtime/Output';

export default class QuietDetectMiddleware extends ConsoleMiddleware {

    async execute(context, next) {
        const {input} = context;
        if (input.options.get('quiet')) {
            context.output = new Output({
                stderr: new NullWriteableStream(),
                stdout: new NullWriteableStream(),
            });
        }
        const exitCode = await super.execute(context, next);
        return exitCode;
    }
}
