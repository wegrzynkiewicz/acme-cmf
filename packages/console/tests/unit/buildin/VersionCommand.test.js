import * as Console from '../../../';
import sinon from 'sinon';

describe('VersionCommand', () => {
    it('should return valid response', async () => {
        const version = '0.0.0';
        const versionCommand = new Console.VersionCommand({
            provide() {
                return Promise.resolve(version);
            },
        });
        const writeLine = sinon.fake();

        await versionCommand.execute({
            output: {
                writeLine,
            },
        });

        sinon.assert.calledOnce(writeLine);
        sinon.assert.calledWith(writeLine, version);
    });
});
