import * as debug from 'debug';

export function createDebugger(name: string): (formattedText: string, ...args: readonly unknown[]) => void {
    return debug(`acme:${name}`);
}
