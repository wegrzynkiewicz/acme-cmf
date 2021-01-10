import {predefinedProperties, Schema} from '@acme/schema';
import type {ObjectId} from '@acme/schema';
import {UnitBlueprint, PlainUnitPropertyBlueprint} from '@acme/unit';

export class App {
    public _id?: ObjectId;
    public domains?: string[];
    public processorName?: string;

    public static createBlueprint(): UnitBlueprint {
        const app = new UnitBlueprint();

        const _id = new PlainUnitPropertyBlueprint({
            schema: predefinedProperties.ObjectId,
        });
        app.properties.set('_id', _id);

        const domains = new PlainUnitPropertyBlueprint({
            schema: new Schema({
                items: new Schema({
                    type: 'string',
                }),
                type: 'array',
            }),
        });
        app.properties.set('domains', domains);

        const processorName = new PlainUnitPropertyBlueprint({
            schema: new Schema({
                type: 'string',
            }),
        });
        app.properties.set('processorName', processorName);

        return app;
    }
}
