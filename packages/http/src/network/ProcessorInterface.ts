export interface ProcessorInterface {
    name: string,
    process: (
        serviceLocator: Record<string, unknown>,
        context: Record<string, unknown>,
    ) => Promise<void>,
}
