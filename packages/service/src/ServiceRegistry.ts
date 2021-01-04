import {createDebugger} from '@acme/debug';

const debug = createDebugger('service:registry');

function onTimeout(name: string, reject: (Error) => void): void {
    const error = new Error(`Cannot resolve (${name}).`);
    reject(error);
}

export class ServiceRegistry {

    private readonly promises: Map<string, Promise<unknown>> = new Map<string, Promise<unknown>>();
    private readonly resolvers: Map<string, (unknown) => void> = new Map<string, (unknown) => void>();
    private readonly timeout: number = 100;

    public constructor(private serviceLocator: Record<string, unknown>) {
    }

    public registerService(key: string, service: unknown): void {
        this.serviceLocator[key] = service;
        debug('Registered service (%s)', key);

        const resolve = this.resolvers.get(key);
        if (resolve !== undefined) {
            resolve(service);
        }

        this.resolvers.delete(key);
        this.promises.delete(key);
    }

    public async waitForService<T>(serviceName: string): Promise<T> {
        const {[serviceName]: service} = this.serviceLocator;
        if (service !== undefined) {
            return await service as T;
        }

        if (!this.promises.has(serviceName)) {
            const promise = new Promise((resolve, reject) => {
                this.resolvers.set(serviceName, resolve);
                if (isFinite(this.timeout)) {
                    setTimeout(onTimeout, this.timeout, serviceName, reject);
                }
            });
            this.promises.set(serviceName, promise);
        }

        return this.promises.get(serviceName) as Promise<T>;
    }
}
