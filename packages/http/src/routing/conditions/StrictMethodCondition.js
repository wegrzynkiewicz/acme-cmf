class StrictMethodCondition {

    constructor(method) {
        this.method = method;
    }

    match({request}) {
        return request.method === this.method;
    }
}

StrictMethodCondition.DELETE = new StrictMethodCondition('DELETE');
StrictMethodCondition.GET = new StrictMethodCondition('GET');
StrictMethodCondition.HEAD = new StrictMethodCondition('HEAD');
StrictMethodCondition.PATCH = new StrictMethodCondition('PATCH');
StrictMethodCondition.POST = new StrictMethodCondition('POST');
StrictMethodCondition.PUT = new StrictMethodCondition('PUT');

export {StrictMethodCondition};
