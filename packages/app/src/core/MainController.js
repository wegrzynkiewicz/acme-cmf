import {Controller} from 'acme-http-flow-particle';

export class MainController extends Controller {

    async process(context) {
        const response = context.get('response');

        response.writeHead(200);
        response.end('Hello World!');
    }
}
