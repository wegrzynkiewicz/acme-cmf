import {ShopProcessor} from './ShopProcessor';

export class ShopApplicationParticle {

    onInitServices({applicationProcessorRegistry}) {
        applicationProcessorRegistry.registerApplicationProcessor({
            key: 'shop',
            service: new ShopProcessor(),
        });
    }

    onInitRouting({httpManager}) {
        const shopProxy = httpManager.get('shop.proxy');
    }
}
