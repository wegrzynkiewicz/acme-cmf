export function bindParameters(text, params) {
    for (const [key, value] of Object.entries(params)) {
        text = text.replaceAll(`{${key}}`, value);
    }
    return text;
}
