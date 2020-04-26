export class PlainFormatter {

    format(log) {
        const time = log.time.getUTCDate();
        return `${time} :D`;
    }
}
