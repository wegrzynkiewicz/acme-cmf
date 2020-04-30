import {NavigationElement} from '../NavigationElement';

export class NavigationSeparator extends NavigationElement {

    constructor({name}) {
        super({
            name,
            type: 'navigation-separator',
        });
    }
}
