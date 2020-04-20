import stream from 'stream';

export default class NullWriteableStream extends stream.Writable {

    _write(chunk, encoding, callback) {
        callback(null);
    }

    _writev(chunks, callback) {
        callback(null);
    }

    _final(callback) {
        callback(null);
    }
}
