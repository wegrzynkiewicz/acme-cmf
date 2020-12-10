import assert from 'assert';
import {PlainFormatter} from './PlainFormatter';

describe('PlainFormatter', () => {

    it('should create valid plain log formatter', async () => {
        const log = {
            channel: 'TEST',
            message: 'This is only test',
            parameters: {},
            severity: 7,
            tags: ['example-tag'],
            time: new Date('2020-12-06T12:00:00.000Z'),
        };

        const plainFormatter = new PlainFormatter();
        const formattedLog = plainFormatter.format(log);
        const expected = '2020-12-06T12:00:00.000Z [DEBUG] [TEST] This is only test | {}\n';

        assert.strictEqual(formattedLog, expected);
    });

});
