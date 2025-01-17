export function generateAvatar(name: string): string {
    // Encode the name to make it URL-safe
    const encodedName = encodeURIComponent(name);

    // Use DiceBear API with 'avataaars' style
    return `https://api.dicebear.com/6.x/avataaars/svg?seed=${encodedName}`;
}
