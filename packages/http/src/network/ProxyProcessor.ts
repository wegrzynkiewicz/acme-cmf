import type {ProcessorInterface} from './ProcessorInterface';

export class ProxyProcessor implements ProcessorInterface{
    
    public readonly name: string;
    public processor?: ProcessorInterface;

    public constructor(
        {name, processor}: {
            name: string,
            processor?: ProcessorInterface,
        },
    ) {
        this.name = name;
        this.processor = processor;
    }
    
    public async process(
        serviceLocator: Record<string, unknown>,
        context: Record<string, unknown>,
    ): Promise<void> {
        if (this.processor === undefined) {
            throw new Error('Proxy not contain valid processor.');
        }
        await this.processor.process(serviceLocator, context);
    }
}
