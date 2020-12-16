import {bindParameters} from './bindParameters';

export class ConditionalTranslation {

    constructor({key}) {
        this.key = key;
        this.locales = new Map();
    }

    addCondition({callback, locale, text}) {
        const {locales} = this;
        if (locales.has(locale) === false) {
            locales.set(locale, []);
        }
        const conditions = locales.get(locale);
        conditions.push({callback, text});
    }

    getText({locale, parameters}) {
        const conditions = this.locales.get(locale);
        for (const {callback, text} of conditions) {
            if (callback(parameters)) {
                return bindParameters(text, parameters);
            }
        }
        throw new Error(
            `Cannot get text from conditional translation named (${this.key})` +
            ` by locale (${locale}) and parameters (${JSON.stringify(parameters)}).`,
        );
    }
}
