import {EventEmitter} from 'events';

export class Processor extends EventEmitter {

    constructor({name}) {
        super();
        this.name = name;
    }

    async process(context) {
        throw new Error('Processor must implementing process method.');
    }
}
