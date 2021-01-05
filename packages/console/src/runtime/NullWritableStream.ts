import {Writable} from 'stream';

export class NullWritableStream extends Writable {

    public _write(
        chunk: unknown,
        encoding: BufferEncoding,
        callback: (error?: (Error | null)) => void,
    ): void {
        callback(null);
    }

    public _writev(
        chunks: { chunk: unknown, encoding: BufferEncoding }[],
        callback: (error?: (Error | null)) => void,
    ): void {
        callback(null);
    }

    public _final(
        callback: (error?: (Error | null)) => void,
    ): void {
        callback(null);
    }
}
