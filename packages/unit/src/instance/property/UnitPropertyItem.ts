export class UnitPropertyItem<RequirementType extends Record<string, string>, ValueType> {

    public requirement?: RequirementType;
    public value: ValueType;

    public constructor(
        {requirement, value}: {
            requirement?: RequirementType,
            value: ValueType,
        },
    ) {
        this.requirement = requirement;
        this.value = value;
    }

    public satisfyRequirements(conditions: {[K in keyof RequirementType]?: RequirementType[K]}): boolean {
        if (this.requirement === undefined) {
            return true;
        }
        for (const [requiredName, requiredValue] of Object.entries(this.requirement)) {
            const conditionValue = conditions[requiredName] as unknown;
            if (conditionValue !== undefined && conditionValue !== requiredValue) {
                return false;
            }
        }
        return true;
    }

    public toJSON(): Record<string, unknown> {
        return {
            req: this.requirement ?? {},
            val: this.value,
        };
    }
}
