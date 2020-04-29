import {Processor} from './Processor';

export class Middleware extends Processor {

    async process(context) {
        throw new Error('Middleware must implementing process method.');
    }
}
