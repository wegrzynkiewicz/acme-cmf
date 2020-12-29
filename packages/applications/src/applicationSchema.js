import {predefinedProperties, schemaKeySymbol} from '@acme/schema';

export const applicationSchema = {
    properties: {
        _id: predefinedProperties.ObjectId,
        hid: predefinedProperties.HumanId,
        processor: {
            type: string,
        },
    },
    required: ['_id'],
    [schemaKeySymbol]: 'application',
    type: 'object',
};
