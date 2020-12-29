import {strictEqual} from 'assert';
import {SegmentDirCondition} from './SegmentDirCondition';

describe('PathCondition', () => {

    it('should match with strict static path', async () => {
        const request = {path: '/admin/dashboard'};

        const pathCondition = new SegmentDirCondition('/admin');

        strictEqual(pathCondition.match({request}), true);
    });

    it('should not match with longer static path', async () => {
        const request = {path: '/admin/products/new'};

        const pathCondition = new SegmentDirCondition('/admin');

        strictEqual(pathCondition.match({request}), false);
    });

    it('should match with parameter', async () => {
        const request = {path: '/admin/products/new'};

        const pathCondition = new SegmentDirCondition('/admin/{products}');

        strictEqual(pathCondition.match({request}), true);
    });

    it('should not match with strict after parameter', async () => {
        const request = {path: '/admin/products/1/images'};

        const pathCondition = new SegmentDirCondition('/admin/{products}');

        strictEqual(pathCondition.match({request}), false);
    });

});
