import {Schema} from './Schema';

export const predefinedProperties: Record<string, Schema> = {
    humanId: new Schema({
        type: 'string',
    }),
    objectId: new Schema({
        type: 'string',
    }),
};
