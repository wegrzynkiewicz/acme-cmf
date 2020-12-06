export function createLog({channel = '', message = '', parameters = undefined, severity, tags = []}) {

    const parsedSeverity = parseInt(severity, 10);
    if (isNaN(parsedSeverity) || parsedSeverity < 0 || parsedSeverity > 8) {
        throw new Error('Invalid log severity passed.');
    }

    return {
        channel,
        message,
        parameters,
        severity: parsedSeverity,
        tags,
        time: new Date(),
    };
}
