function isPropertyKey(argument: unknown): boolean {
    switch (typeof argument) {
        case 'string': return true;
        case 'symbol': return true;
        default: return false;
    }
}

export function meta(
    options: Record<string, unknown>,
): {
    (target: new (...args: unknown[]) => unknown): void,
    (target: unknown, propertyKey: string | symbol): void,
} {
    function decorator(target: new (...args: unknown[]) => unknown): void;
    function decorator(target: unknown, propertyKey: string | symbol): void;
    function decorator(target: unknown, propertyKey?: string | symbol): void {
        if (typeof target === 'object' ? target === null : typeof target !== 'function') {
            throw new TypeError('Decoration target is null.');
        }
        if (propertyKey !== undefined && !isPropertyKey(propertyKey)) {
            throw new TypeError('Invalid decorator property key.');
        }

        const constructor = (
            propertyKey === undefined
                ? target
                : (target as Record<string, unknown>).constructor
        ) as new (...args: unknown[]) => unknown;
        const props = Reflect.getMetadata('metadata:properties', constructor) as Set<string | symbol> | undefined;
        const propertiesSet = props === undefined ? new Set<string | symbol>() : props;
        if (propertyKey !== undefined) {
            propertiesSet.add(propertyKey);
        }
        Reflect.defineMetadata('metadata:properties', propertiesSet, constructor);

        for (const [key, value] of Object.entries(options)) {
            if (propertyKey !== undefined) {
                Reflect.defineMetadata(key, value, target as Record<string, unknown>, propertyKey);
            } else {
                Reflect.defineMetadata(key, value, target as Record<string, unknown>);
            }
        }
    }
    return decorator;
}
