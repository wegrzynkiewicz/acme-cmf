import assert from 'assert';
import {TreeNode} from './TreeNode';

describe('TreeNode', () => {

    it('should create valid tree structure', async () => {
        const rootTarget = {};
        const firstTarget = {};
        const secondATarget = {};
        const secondBTarget = {};

        const rootTreeNode = new TreeNode(rootTarget);
        const firstTreeNode = new TreeNode(firstTarget);
        const secondATreeNode = new TreeNode(secondATarget);
        const secondBTreeNode = new TreeNode(secondBTarget);
        secondATreeNode.setParent(firstTreeNode);
        secondBTreeNode.setParent(firstTreeNode);
        firstTreeNode.setParent(rootTreeNode);

        assert.strictEqual(rootTreeNode.children.size, 1);
        assert.strictEqual(firstTreeNode.children.size, 2);
        assert.strictEqual(secondATreeNode.children.size, 0);
        assert.strictEqual(secondBTreeNode.children.size, 0);
        assert.strictEqual(rootTreeNode.target, rootTarget);
        assert.strictEqual(firstTreeNode.target, firstTarget);
        assert.strictEqual(secondATreeNode.target, secondATarget);
        assert.strictEqual(secondBTreeNode.target, secondBTarget);
        assert.strictEqual(rootTreeNode.parent, null);
        assert.strictEqual(firstTreeNode.parent, rootTreeNode);
        assert.strictEqual(secondATreeNode.parent, firstTreeNode);
        assert.strictEqual(secondBTreeNode.parent, firstTreeNode);
    });

});
