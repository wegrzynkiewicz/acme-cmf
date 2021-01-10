import {createDebugger} from '@acme/debug';
import type {UnitBlueprint} from '../blueprint/UnitBlueprint';

const debug = createDebugger('unit-blueprint:registry');

export class UnitBlueprintRegistry {

    public readonly blueprints = new Map<string, UnitBlueprint>();

    public registerUnitBlueprint(unitBlueprintKey: string, unitBlueprint: UnitBlueprint): void {
        this.blueprints.set(unitBlueprintKey, unitBlueprint);
        debug('Registered blueprints (%s)', unitBlueprintKey);
    }
}
