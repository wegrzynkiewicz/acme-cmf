import {PassThrough} from 'stream';
import {fake, assert} from 'sinon';
import {Log} from '../Log';
import {StreamHandler} from './StreamHandler';

describe('streamHandler', () => {

    it('should write log to stream', async () => {

        const log = new Log({
            channel: 'test',
            message: 'This is only test',
            parameters: {},
            severity: 7,
            tags: ['example-tag'],
        });

        const formatter = {
            format: fake((logToFormat) => logToFormat.message),
        };

        const filter = {
            filtrate: fake.returns(true),
        };

        const write = fake();
        const stream = new PassThrough({objectMode: true, write});

        const streamHandler = new StreamHandler({filter, formatter, stream});
        streamHandler.handle(log);

        assert.calledOnce(filter.filtrate);
        assert.calledWith(filter.filtrate, log);
        assert.calledOnce(formatter.format);
        assert.calledWith(formatter.format, log);
        assert.calledOnce(write);
        assert.calledWith(write, 'This is only test');
    });

});
