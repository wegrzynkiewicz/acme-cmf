import sinon from 'sinon';
import {VersionCommand} from './VersionCommand';

describe('VersionCommand', () => {
    it('should return valid response', async () => {
        const version = '0.0.0';
        const versionCommand = new VersionCommand({
            async provide() {
                return version;
            },
        });
        const writeLine = sinon.fake();
        const context = {
            output: {
                writeLine,
            },
        };

        await versionCommand.execute(context);

        sinon.assert.calledOnce(writeLine);
        sinon.assert.calledWith(writeLine, version);
    });
});
