import assert from 'assert';
import sinon from 'sinon';
import {Translator} from './Translator';

describe('Translator', () => {

    it('should translate basic text', async () => {
        const translations = new Map();
        translations.set('hello', {getText: sinon.fake.returns('Hello World!')});

        const translator = new Translator({locale: 'en', translations});
        const actual = translator.translate({key: 'hello'});

        assert.strictEqual(actual, 'Hello World!');
    });

    it('should return key then not found translation', async () => {
        const translations = new Map();
        const translator = new Translator({locale: 'en', translations});
        const actual = translator.translate({key: 'not.exists'});

        assert.strictEqual(actual, 'not.exists');
    });
});
