import {ViewComponent} from '../ViewComponent';

export class Navigation extends ViewComponent {

    constructor({name, rootTreeNode}) {
        super({
            name,
            type: 'navigation',
        });
        this.rootNode = rootTreeNode;
    }
}
