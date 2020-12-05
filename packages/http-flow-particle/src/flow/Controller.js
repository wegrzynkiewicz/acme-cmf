import {Processor} from './Processor';

export class Controller extends Processor {

    async process(context) {
        throw new Error('Controller must implementing process method.');
    }
}
