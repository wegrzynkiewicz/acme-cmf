import sinon from 'sinon';
import {createLog} from '../createLog';
import {StreamHandler} from './StreamHandler';

describe('StreamHandler', () => {

    it('should write log to stream', async () => {
        const log = createLog({
            channel: 'test',
            message: 'This is only test',
            parameters: {},
            severity: 7,
            tags: ['example-tag'],
        });

        const formatter = {
            format: sinon.fake((logToFormat) => logToFormat.message),
        };

        const filter = {
            filtrate: sinon.fake.returns(true),
        };

        const stream = {
            write: sinon.fake(),
        };

        const streamHandler = new StreamHandler({filter, formatter, stream});
        await streamHandler.handle(log);

        sinon.assert.calledOnce(filter.filtrate);
        sinon.assert.calledWith(filter.filtrate, log);
        sinon.assert.calledOnce(formatter.format);
        sinon.assert.calledWith(formatter.format, log);
        sinon.assert.calledOnce(stream.write);
        sinon.assert.calledWith(stream.write, 'This is only test');
    });

});
