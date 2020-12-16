import {fake, assert} from 'sinon';
import {VersionCommand} from './VersionCommand';

describe('VersionCommand', () => {

    it('should return valid response', async () => {
        const copyright = '2020';
        const intro = '@acme/console';
        const revision = '0000000';
        const version = '0.0.0';
        const versionCommand = new VersionCommand({copyright, intro, revision, version});
        const writeLine = fake();
        const context = {
            output: {
                writeLine,
            },
        };

        await versionCommand.execute(context);

        assert.calledOnce(writeLine);
        assert.calledWith(writeLine, '@acme/console version 0.0.0 revision 0000000 copyright 2020');
    });
});
