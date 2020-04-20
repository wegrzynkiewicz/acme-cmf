export default class ConsoleMiddleware {

    async execute(context, next) {
        const exitCode = await next(context);
        return exitCode;
    }
}
