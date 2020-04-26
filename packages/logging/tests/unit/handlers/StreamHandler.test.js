import sinon from 'sinon';
import {Log, StreamHandler} from '../../..';

describe('StreamHandler', () => {

    it('should write log to stream', async () => {
        const log = new Log({
            channel: 'test',
            message: 'This is only test',
            parameters: {},
            severity: 7,
            tags: ['example-tag'],
        });
        const filter = {
            isAcceptable: sinon.fake.returns(true),
        };
        const formatter = {
            format: sinon.fake((logToFormat) => logToFormat.message),
        };
        const stream = {
            write: sinon.fake(),
        };

        const streamHandler = new StreamHandler({filter, formatter, stream});
        await streamHandler.handle(log);

        sinon.assert.calledOnce(filter.isAcceptable);
        sinon.assert.calledWith(filter.isAcceptable, log);
        sinon.assert.calledOnce(formatter.format);
        sinon.assert.calledWith(formatter.format, log);
        sinon.assert.calledOnce(stream.write);
        sinon.assert.calledWith(stream.write, 'This is only test');
    });

});
