import type {UnitPropertyInterface} from './UnitPropertyInterface';

export class PlainUnitProperty<ValueType> implements UnitPropertyInterface {

    public value: ValueType;

    public resolveValue(
        {requirement}: {
            requirement: Record<string, string>,
        },
    ): ValueType {
        return this.value;
    }

    public toJSON(): ValueType {
        return this.value;
    }
}
