import {MongoClient} from 'mongodb';

export class DBInstanceParticle {

    constructor({name}) {
        this.name = name;
    }

    onInitConfig({configRegistry}) {
        const {name} = this;

        configRegistry.register({
            key: `db.${name}.hostname`,
            type: 'string',
        });
        configRegistry.register({
            key: `db.${name}.port`,
            type: 'port',
        });
        configRegistry.register({
            key: `db.${name}.username`,
            type: 'string',
        });
        configRegistry.register({
            key: `db.${name}.password`,
            type: 'secret',
        });
    }

    async onInitServices({serviceLocator, config, loggerFactory}) {
        const {name} = this;
        const hostname = config.get(`db.${name}.hostname`);
        const port = config.get(`db.${name}.port`);
        const user = config.get(`db.${name}.username`);
        const password = config.get(`db.${name}.password`);
        const url = `mongodb://${hostname}:${port}`;
        const client = new MongoClient(url, {
            auth: {password, user},
        });
        await client.connect();
        const database = client.db('test');
    }
}
