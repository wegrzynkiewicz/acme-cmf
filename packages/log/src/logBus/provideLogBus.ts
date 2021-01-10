import type {Writable} from 'stream';
import {SeverityFilter} from '../filters/SeverityFilter';
import {PlainFormatter} from '../formaters/PlainFormatter';
import {StreamHandler} from '../handlers/StreamHandler';
import {LogBus} from './LogBus';

function provideStreamHandler(
    {config, key, stream}: {
        config: Map<string, unknown>,
        key: string,
        stream: Writable,
    },
): StreamHandler[] {
    if (config.get(`log.${key}.enabled`) === false) {
        return [];
    }
    const minSeverity = config.get(`log.${key}.min.severity`) as number;
    const formatter = new PlainFormatter();
    const filter = new SeverityFilter({minSeverity});
    const handler = new StreamHandler({filter, formatter, stream});
    return [handler];
}

export function provideLogBus(
    {config, stderr, stdout}: {
        config: Map<string, unknown>,
        stderr: Writable,
        stdout: Writable,
    },
): LogBus {
    return new LogBus({
        handlers: [
            ...provideStreamHandler({config, key: 'stderr', stream: stderr}),
            ...provideStreamHandler({config, key: 'stdout', stream: stdout}),
        ],
    });
}
