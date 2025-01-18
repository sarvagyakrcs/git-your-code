export function beautifyQuestion(input: string): string {
    // Trim leading and trailing spaces
    input = input.trim();

    // Capitalize the first letter of the string
    input = input.charAt(0).toUpperCase() + input.slice(1);

    // Capitalize letters after full stops
    input = input.replace(/(\.\s*)([a-z])/g, (_, before, letter) => `${before}${letter.toUpperCase()}`);

    // Add a question mark at the end if not already present
    if (!input.endsWith("?")) {
        input += "?";
    }

    return input;
}