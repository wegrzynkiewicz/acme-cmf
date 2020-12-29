import {ShopProcessor} from './ShopProcessor';

export class ShopAppParticle {

    onInitRouting({httpManager}) {
        const shopProcessor = new ShopProcessor({name: 'shop'});
        httpManager.registerProcessor(shopProcessor);
    }
}
