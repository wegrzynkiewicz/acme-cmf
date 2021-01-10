import {UnitPropertyItem} from './UnitPropertyItem';

export abstract class AbstractUnitProperty<RequirementType extends Record<string, string>, ValueType> {

    public readonly items = new Set<UnitPropertyItem<RequirementType, ValueType>>();

    public add(
        {requirement, value}: {
            requirement?: RequirementType,
            value: ValueType,
        },
    ): void {
        const item = new UnitPropertyItem({
            requirement,
            value,
        });
        this.items.add(item);
    }

    public toJSON(): UnitPropertyItem<RequirementType, ValueType>[] {
        return [...this.items.values()];
    }
}
