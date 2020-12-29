import {applicationSchema} from './applicationSchema';

export class ApplicationsParticle {

    onInitSchemas({schemaRegistry}) {
        schemaRegistry.registerSchema(applicationSchema);
    }
}
