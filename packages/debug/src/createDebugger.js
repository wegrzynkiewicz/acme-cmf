import debug from 'debug';

export function createDebugger(name) {
    return debug(`acme:${name}`);
}
