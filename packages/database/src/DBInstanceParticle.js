import {MongoClient} from 'mongodb';

export class DBInstanceParticle {

    constructor({name}) {
        this.name = name;
    }

    onInitConfig({configRegistry}) {
        const {name} = this;

        configRegistry.register({
            key: `dbm.${name}.dsn`,
            type: 'dsn',
        });
    }

    async onInitServices({serviceLocator, config, loggerFactory}) {
        const {name} = this;
        const dsn = config.get(`dbm.${name}.dsn`);
        const client = new MongoClient(dsn, {poolSize:40});
        await client.connect();
        const database = client.db();
    }
}
