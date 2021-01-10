import type {ProcessorInterface} from './network/ProcessorInterface';

export class HTTPManager {

    public readonly processors = new Map<string, ProcessorInterface>();

    public registerProcessor(processor: ProcessorInterface): void {
        this.processors.set(processor.name, processor);
    }

    public getProcessor(processorName: string): ProcessorInterface {
        const processor = this.processors.get(processorName);
        if (processor === undefined) {
            throw new Error(`HTTP entry named (${processorName}) does not exits.`);
        }
        return processor;
    }
}
