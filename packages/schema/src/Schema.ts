export class Schema {

    public readonly description?: string;
    public readonly properties?: Record<string, Schema>;
    public readonly required?: string[];
    public readonly title?: string;
    public readonly type: string;

    public constructor(
        {description, properties, required, title, type}: {
            description?: string,
            properties?: Record<string, Schema>,
            required?: string[],
            title?: string,
            type: string,
        },
    ) {
        this.description = description;
        this.properties = properties;
        this.required = required;
        this.title = title;
        this.type = type;
    }
}
