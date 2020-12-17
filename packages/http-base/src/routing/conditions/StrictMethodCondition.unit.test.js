import {strictEqual} from 'assert';
import {StrictMethodCondition} from './StrictMethodCondition';

describe('StrictMethodCondition', () => {

    it('should match with strict method', async () => {
        const request = {method: 'GET'};

        const strictMethodCondition = new StrictMethodCondition('GET');

        strictEqual(strictMethodCondition.match({request}), true);
    });

    it('should not match wrong method', async () => {
        const request = {method: 'POST'};

        const strictMethodCondition = new StrictMethodCondition('GET');

        strictEqual(strictMethodCondition.match({request}), false);
    });

});
