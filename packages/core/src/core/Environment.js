export class Environment {

    constructor({variables}) {
        this.variables = {...variables};
    }

    get(environmentVariableName) {
        const value = this.variables[environmentVariableName];
        if (value === undefined) {
            throw new Error(`Environment variable (${environmentVariableName}) not exist or is invalid.`);
        }
        return value;
    }
}
