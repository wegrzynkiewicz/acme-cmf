import {DBManager} from './DBManager';

export class DBBaseParticle {

    onInitServices({serviceRegistry}) {
        serviceRegistry.registerService({
            key: 'dbManager',
            service: new DBManager(),
        });
    }
}
