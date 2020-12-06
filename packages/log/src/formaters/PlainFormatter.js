import {convertSeverityCodeToLabel} from '../severity';

export class PlainFormatter {

    format(log) {
        const {channel, message, parameters, severity, time} = log;
        const isoTime = time.toISOString();
        const severityLabel = convertSeverityCodeToLabel(severity);
        const params = parameters ? ` | ${JSON.stringify(parameters)}` : '';

        return `${isoTime} [${severityLabel}] [${channel}] ${message}${params}\n`;
    }
}
