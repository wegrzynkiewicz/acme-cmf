export default class RuntimeContext {

    constructor({application, command, input, output, usagePrinter}) {
        this.application = application;
        this.command = command;
        this.input = input;
        this.output = output;
        this.usagePrinter = usagePrinter;
    }
}
