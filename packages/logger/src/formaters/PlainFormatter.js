import severities from '../severities';

const map = [...severities].map((severity) => severity.toUpperCase());

export class PlainFormatter {

    format(log) {
        const {channel, message, parameters, severity, time} = log;
        const isoTime = time.toISOString();
        const level = map[severity];
        const params = parameters ? ` | ${JSON.stringify(parameters)}` : '';

        return `${isoTime} [${level}] [${channel}] ${message}${params}\n`;
    }
}
