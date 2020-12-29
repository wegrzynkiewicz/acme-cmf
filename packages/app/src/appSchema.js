import {predefinedProperties, schemaKeySymbol} from '@acme/schema';

export const appSchema = {
    properties: {
        _id: predefinedProperties.ObjectId,
        hid: predefinedProperties.HumanId,
        processor: {
            type: 'string',
        },
    },
    required: ['_id'],
    [schemaKeySymbol]: 'app',
    type: 'object',
};
