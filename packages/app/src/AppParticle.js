import {HTTPNetworkParticle} from '@acme/http';
import {AppResolverProcessor} from './AppResolverProcessor';
import {appSchema} from './appSchema';

export class AppParticle {

    constructor({name}) {
        this.name = name;
    }

    async onInitParticles({particleManager}) {
        const {name} = this;
        const httpNetworkParticle = new HTTPNetworkParticle({name});
        await particleManager.registerParticle(httpNetworkParticle);
    }

    onInitRouting({httpManager}) {
        const {name} = this;
        const appRepository = {
            findByRequest() {
                return {
                    processor: 'shop',
                };
            },
        };

        const appResolverProcessor = new AppResolverProcessor({
            appRepository,
            httpManager,
            name: `${name}.app-resolver`,
        });

        const mainProxy = httpManager.getProcessor('main.proxy');
        mainProxy.setProcessor(appResolverProcessor);
    }

    onInitSchemas({schemaRegistry}) {
        schemaRegistry.registerSchema(appSchema);
    }
}
