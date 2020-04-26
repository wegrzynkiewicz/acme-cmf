const map = [
    'EMERGENCY',
    'ALERT',
    'CRITICAL',
    'ERROR',
    'WARNING',
    'NOTICE',
    'INFO',
    'DEBUG',
    'SILLY',
];

export class PlainFormatter {

    format(log) {
        const {channel, message, parameters, severity, time} = log;
        const isoTime = time.toISOString();
        const level = map[severity];
        const params = parameters ? ` | ${JSON.stringify(parameters)}` : '';

        return `${isoTime} [${level}] [${channel}] ${message}${params}\n`;
    }
}
