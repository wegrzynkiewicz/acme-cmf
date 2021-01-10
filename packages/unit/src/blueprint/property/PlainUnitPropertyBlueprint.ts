import type {Schema} from '@acme/schema';
import type {UnitPropertyBlueprintInterface} from './UnitPropertyBlueprintInterface';

export class PlainUnitPropertyBlueprint implements UnitPropertyBlueprintInterface {

    private readonly schema: Schema;

    public constructor(
        {schema}: {
            schema: Schema,
        },
    ) {
        this.schema = schema;
    }
}
