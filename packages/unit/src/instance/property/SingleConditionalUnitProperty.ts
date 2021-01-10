import {AbstractUnitProperty} from './AbstractUnitProperty';
import type {UnitPropertyInterface} from './UnitPropertyInterface';


export class SingleConditionalUnitProperty<RequirementType extends Record<string, string>, ValueType>
    extends AbstractUnitProperty<RequirementType, ValueType>
    implements UnitPropertyInterface {

    public resolveValue(
        {requirement}: {
            requirement: RequirementType,
        },
    ): ValueType | null {
        for (const item of this.items.values()) {
            if (item.satisfyRequirements(requirement)) {
                return item.value;
            }
        }
        return null;
    }
}
