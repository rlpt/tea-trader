const fs = require("fs");
const path = require("path");

function toKebabCase(name) {
    // Split at first period to separate initial name from the rest
    const [firstPart, ...rest] = name.split(".");

    // Convert camelCase and PascalCase to space-separated for first part only
    const withSpaces = firstPart
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");

    // Convert first part to kebab case
    const kebab = withSpaces
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters except hyphen
        .replace(/[\s_]+/g, "-") // Convert spaces and underscores to hyphens
        .replace(/-+/g, "-") // Remove consecutive hyphens
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

    // Rejoin with the rest of the parts
    return rest.length > 0 ? `${kebab}.${rest.join(".")}` : kebab;
}

async function renameFilesToKebab(directory) {
    try {
        const entries = await fs.promises.readdir(directory, {
            withFileTypes: true,
        });

        for (const entry of entries) {
            const oldPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                // Recursively process subdirectories
                await renameFilesToKebab(oldPath);
            } else if (!entry.name.startsWith(".")) {
                // Skip hidden files
                const newFileName = toKebabCase(entry.name);
                const newPath = path.join(directory, newFileName);

                if (oldPath !== newPath) {
                    console.log(`Renaming: ${entry.name} -> ${newFileName}`);
                    await fs.promises.rename(oldPath, newPath);
                }
            }
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Usage
const targetDirectory = "."; // Current directory
renameFilesToKebab(targetDirectory).then(() => {
    console.log("File renaming complete!");
});
