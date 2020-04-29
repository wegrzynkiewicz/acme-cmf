import assert from 'assert';
import {StrictMethods} from '../../../../src/routing/conditions/StrictMethods';

describe('StrictMethods', () => {

    it('should match valid methods', async () => {
        const routingStateContextMock = {
            method: 'POST',
        };
        const strictMethods = new StrictMethods(['POST']);

        assert.ok(strictMethods.match(routingStateContextMock));
    });

});
