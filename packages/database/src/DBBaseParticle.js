import {DBManager} from './DBManager';

export class DBBaseParticle {

    onInitServices({serviceRegistry}) {
        const dbManager = new DBManager();
        serviceRegistry.registerService('dbManager', dbManager);
    }
}
