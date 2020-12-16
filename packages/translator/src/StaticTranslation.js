import {bindParameters} from './bindParameters';

export class StaticTranslation {

    constructor({key}) {
        this.key = key;
        this.locales = new Map();
    }

    addText({locale, text}) {
        this.locales.set(locale, text);
    }

    getText({locale, parameters}) {
        const text = this.locales.get(locale) || '';
        return bindParameters(text, parameters);
    }
}
