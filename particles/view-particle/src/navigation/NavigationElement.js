import {ViewComponent} from '../ViewComponent';

export class NavigationElement extends ViewComponent {

    constructor({name}) {
        super({
            name,
            type: 'navigation-element',
        });
    }
}
