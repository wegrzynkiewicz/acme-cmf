export interface Executable {
    execute: (globalContext: Record<string, unknown>, context: Record<string, unknown>) => Promise<number>,
}
