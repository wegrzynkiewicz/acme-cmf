import {HTTPNetworkParticle} from '@acme/http';
import type {HTTPManager, ProxyProcessor} from '@acme/http';
import type {ParticleInterface, ParticleManager} from '@acme/service';
import {AppResolverProcessor} from './AppResolverProcessor';

export class AppParticle implements ParticleInterface {

    public readonly name: string;

    public constructor(
        {name}: {
            name: string,
        },
    ) {
        this.name = name;
    }

    public async onInitParticles(
        {particleManager}: {
            particleManager: ParticleManager,
        },
    ): Promise<void> {
        const {name} = this;
        const httpNetworkParticle = new HTTPNetworkParticle({name});
        await particleManager.registerParticle(httpNetworkParticle);
    }
    
    public async onInitRouting(
        {httpManager}: {
            httpManager: HTTPManager,
        },
    ): Promise<void> {
        const {name} = this;

        const appResolverProcessor = new AppResolverProcessor({
            httpManager,
            name: `${name}.app-resolver`,
        });

        const mainProxy = httpManager.getProcessor(`${name}.proxy`) as ProxyProcessor;
        mainProxy.processor = appResolverProcessor;
    }
}
