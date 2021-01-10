import {AbstractUnitProperty} from './AbstractUnitProperty';
import type {UnitPropertyInterface} from './UnitPropertyInterface';


export class ArrayConditionalUnitProperty<RequirementType extends Record<string, string>, ValueType>
    extends AbstractUnitProperty<RequirementType, ValueType>
    implements UnitPropertyInterface {

    public resolveValue(
        {requirement}: {
            requirement: RequirementType,
        },
    ): ValueType[] {
        const items: ValueType[] = [];
        for (const item of this.items.values()) {
            if (item.satisfyRequirements(requirement)) {
                items.push(item.value);
            }
        }
        return items;
    }
}
