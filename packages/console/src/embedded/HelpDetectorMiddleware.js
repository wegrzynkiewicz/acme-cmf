import ConsoleMiddleware from '../define/ConsoleMiddleware';

export default class HelpDetectorMiddleware extends ConsoleMiddleware {

    async execute(context, next) {
        const exitCode = await next(context);
        return exitCode;
    }
}
