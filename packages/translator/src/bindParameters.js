export function bindParameters(text, parameters) {
    for (const [key, value] of Object.entries(parameters)) {
        text = text.replaceAll(`{${key}}`, value);
    }
    return text;
}
