import {HTTPNetworkParticle} from '@acme/http';
import {appSchema} from './appSchema';
import {AppResolverProcessor} from './AppResolverProcessor';

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
