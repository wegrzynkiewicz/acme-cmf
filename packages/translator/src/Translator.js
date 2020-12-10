export class Translator {

    constructor({locale, translations}) {
        this.locale = locale;
        this.translations = translations;
    }

    translate({key, params}) {
        const {locale, translations} = this;
        const translation = translations.get(key);
        if (translation === undefined) {
            return key;
        }
        return translation.getText(locale, params);
    }
}
