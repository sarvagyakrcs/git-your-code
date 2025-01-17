export function isUrl(input: string): boolean {
    const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(input);
}

export function isFileKey(input: string): boolean {
    // Regex for file key (does not look like a URL)
    const fileKeyRegex = /^[^:/?#]+\/?[^:/?#]*$/;
    return fileKeyRegex.test(input);
}