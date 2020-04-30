import {NavigationElement} from '../NavigationElement';

export class NavigationLink extends NavigationElement {

    constructor({content = '', icon = null, name, href = '#'}) {
        super({
            name,
            type: 'navigation-link',
        });
        this.content = content;
        this.icon = icon;
        this.href = href;
    }
}
