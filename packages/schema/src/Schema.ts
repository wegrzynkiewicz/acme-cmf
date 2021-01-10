export class Schema {

    public readonly description?: string;
    public readonly items?: Schema;
    public readonly properties?: Record<string, Schema>;
    public readonly required?: string[];
    public readonly title?: string;
    public readonly type: string;

    public constructor(
        {description, items, properties, required, title, type}: {
            description?: string,
            items?: Schema,
            properties?: Record<string, Schema>,
            required?: string[],
            title?: string,
            type: string,
        },
    ) {
        this.description = description;
        this.items = items;
        this.properties = properties;
        this.required = required;
        this.title = title;
        this.type = type;
    }
}
