import {predefinedProperties, schemaKeySymbol} from '@acme/schema';

export const applicationSchema = {
    properties: {
        _id: {...predefinedProperties.ObjectId},
    },
    required: ['_id'],
    [schemaKeySymbol]: 'application',
    type: 'object',
};
