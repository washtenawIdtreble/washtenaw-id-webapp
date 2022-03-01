export function toTitleCase(s: string) {
    let modified = "";

    for (let index = 0; index < s.length; index++) {
        if (index === 0 || s[index - 1] === " ") {
            modified = modified.concat(s[index].toUpperCase());
        } else {
            modified = modified.concat(s[index].toLowerCase());
        }
    }

    return modified;
}