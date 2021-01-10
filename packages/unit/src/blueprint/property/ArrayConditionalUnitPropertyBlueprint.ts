import type {Schema} from '@acme/schema';
import type {UnitRequirementPropertyBlueprint} from '../requirement/UnitRequirementPropertyBlueprint';
import type {UnitPropertyBlueprintInterface} from './UnitPropertyBlueprintInterface';


export class ArrayConditionalUnitPropertyBlueprint implements UnitPropertyBlueprintInterface {

    private readonly requirement: UnitRequirementPropertyBlueprint;
    private readonly schema: Schema;

    public constructor(
        {requirement, itemSchema}: {
            requirement: UnitRequirementPropertyBlueprint,
            itemSchema: Schema,
        },
    ) {
        this.requirement = requirement;
        this.schema = itemSchema;
    }
}
