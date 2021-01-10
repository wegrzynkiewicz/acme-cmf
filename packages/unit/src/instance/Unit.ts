import type {UnitPropertyInterface} from './property/UnitPropertyInterface';

export class Unit {
    public readonly properties = new Map<string, UnitPropertyInterface>();

    public resolveObject(
        {requirement}: {
            requirement: Record<string, string>,
        },
    ): Record<string, unknown> {
        const record: Record<string, unknown> = {};
        for (const [propertyName, property] of this.properties.entries()) {
            record[propertyName] = property.resolveValue({requirement});
        }
        return record;
    }

    public resolveProperty(
        {name, requirement}: {
            name: string,
            requirement: Record<string, string>,
        },
    ): unknown {
        const property = this.properties.get(name);
        if (property === undefined) {
            return null;
        }
        const value = property.resolveValue({requirement});
        return value;
    }

    public toJSON(): Record<string, unknown> {
        const record: Record<string, unknown> = {};
        for (const [propertyName, property] of this.properties.entries()) {
            record[propertyName] = property;
        }
        return record;
    }
}
