export function bindParameters(text: string, parameters: Record<string, string>): string {
    let previous = '';
    for (const [key, value] of Object.entries(parameters)) {
        while (true) {
            previous = text.replace(`{${key}}`, value);
            if (previous === text) {
                break;
            }
            text = previous;
        }
    }
    return text;
}
