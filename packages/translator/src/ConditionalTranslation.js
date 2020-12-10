import {bindParameters} from './bindParameters';

export class ConditionalTranslation {

    constructor({key}) {
        this.key = key;
        this.locales = Object.create(null);
    }

    addCondition({callback, locale, text}) {
        const {locales} = this;
        locales[locale] = locales[locale] || [];
        locales.push({callback, text});
    }

    getText({locale, parameters}) {
        const conditions = this.locales[locale];
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