import type {Schema} from '@acme/schema';
import type {UnitRequirementPropertyBlueprint} from '../requirement/UnitRequirementPropertyBlueprint';
import type {UnitPropertyBlueprintInterface} from './UnitPropertyBlueprintInterface';

export class SingleConditionalUnitPropertyBlueprint implements UnitPropertyBlueprintInterface {

    private readonly requirement: UnitRequirementPropertyBlueprint;
    private readonly schema: Schema;

    public constructor(
        {requirement, schema}: {
            requirement: UnitRequirementPropertyBlueprint,
            schema: Schema,
        },
    ) {
        this.requirement = requirement;
        this.schema = schema;
    }
}
