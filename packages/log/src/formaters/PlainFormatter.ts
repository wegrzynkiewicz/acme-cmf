import type {Log} from '../Log';
import {convertSeverityCodeToLabel} from '../severity';
import type {FormatterInterface} from './FormatterInterface';

export class PlainFormatter implements FormatterInterface {

    public format({channel, message, parameters, severity, time}: Log): string {
        const isoTime = time.toISOString();
        const severityLabel = convertSeverityCodeToLabel(severity);
        const params = parameters ? ` | ${JSON.stringify(parameters)}` : '';

        return `${isoTime} [${severityLabel}] [${channel}] ${message}${params}\n`;
    }
}
