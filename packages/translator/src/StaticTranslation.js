import {bindParameters} from './bindParameters';

export class StaticTranslation {

    constructor({key}) {
        this.key = key;
        this.locales = Object.create(null);
    }

    addText({locale, text}) {
        this.locales[locale] = text;
    }

    getText({locale, parameters}) {
        const text = this.locales[locale] || '';
        return bindParameters(text, parameters);
    }
}