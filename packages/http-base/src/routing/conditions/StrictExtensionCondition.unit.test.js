import {strictEqual} from 'assert';
import {StrictExtensionCondition} from './StrictExtensionCondition';

describe('StrictExtensionCondition', () => {

    it('should match with strict extension', async () => {
        const request = {path: '/products/1.json'};

        const strictExtensionCondition = new StrictExtensionCondition('.json');

        strictEqual(strictExtensionCondition.match({request}), true);
    });

    it('should match with longer strict extension', async () => {
        const request = {path: '/products/1.json.gz'};

        const strictExtensionCondition = new StrictExtensionCondition('.gz');

        strictEqual(strictExtensionCondition.match({request}), true);
    });

});
