class StrictExtensionCondition {

    constructor(extension) {
        this.extension = '.' + extension.split('.').filter(Boolean).join('.');
    }

    match({request}) {
        return request.path.endsWith(this.extension) === true;
    }
}

StrictExtensionCondition.html = new StrictExtensionCondition('.html');
StrictExtensionCondition.json = new StrictExtensionCondition('.json');
StrictExtensionCondition.xml = new StrictExtensionCondition('.xml');

export {StrictExtensionCondition};
