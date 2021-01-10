export interface UnitPropertyInterface {
    resolveValue: (
        {requirement}: {
            requirement: Record<string, string>,
        },
    ) => unknown,
}
