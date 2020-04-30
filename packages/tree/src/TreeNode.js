let treeNodeId = 0;

export class TreeNode {

    constructor(target) {
        this.children = new Set();
        this.parent = null;
        this.target = target;
        this.treeNodeId = treeNodeId++;
    }

    getRoot() {
        let node = this;
        while (true) {
            if (node.parent === null) {
                return node;
            }
            node = node.parent;
        }
    }

    find(callback) {
        if (callback(this)) {
            return this;
        }
        for (const child of this.children.values()) {
            const searchedSceneNode = child.find(callback);
            if (searchedSceneNode) {
                return searchedSceneNode;
            }
        }
        return undefined;
    }

    setParent(newParentNode) {
        if (this.parent) {
            this.parent.children.delete(this);
        }
        if (newParentNode instanceof TreeNode) {
            this.parent = newParentNode;
            this.parent.children.add(this);
        } else if (newParentNode === null) {
            this.parent = null;
        } else {
            throw new Error('Only TreeNode class can be node parent.');
        }
    }
}
