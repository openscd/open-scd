export const kebabCase = (input: string): string => {
  return (
    input
      // Insert a hyphen before each uppercase letter
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      // Convert the entire string to lowercase
      .toLowerCase()
      // Replace spaces and underscores with hyphens
      .replace(/\s+|_+/g, '-')
      // Remove any leading or trailing hyphens
      .replace(/^-+|-+$/g, '')
  );
};

export const camelCase = (input: string): string => {
  return (
    input
      // Split the string by spaces, underscores, or hyphens
      .split(/[\s-_]+/)
      // Process each word to capitalize the first letter of each word except the first one
      .map((word, index) => {
        if (index === 0) {
          // The first word is kept in lowercase
          return word.toLowerCase();
        }
        // Capitalize the first letter of each subsequent word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      // Join the words back into a single string
      .join('')
  );
};

export const pascalCase = (input: string): string => {
  return (
    input
      // Split the string by spaces, underscores, or hyphens
      .split(/[\s-_]+/)
      // Capitalize the first letter of each word
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      // Join the words back into a single string
      .join('')
  );
};
