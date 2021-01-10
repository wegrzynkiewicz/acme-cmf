import type {UnitPropertyBlueprintInterface} from './property/UnitPropertyBlueprintInterface';

export class UnitBlueprint {
    public readonly properties = new Map<string, UnitPropertyBlueprintInterface>();
}
