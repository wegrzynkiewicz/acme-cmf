import {ShopProcessor} from './ShopProcessor';

export class ShopAppParticle {

    onInitServices({appProcessorRegistry}) {
        appProcessorRegistry.registerAppProcessor({
            key: 'shop',
            service: new ShopProcessor(),
        });
        AppResolverProcessor
    }

    onInitRouting({httpManager}) {
        const shopProxy = httpManager.get('shop.proxy');
    }
}
