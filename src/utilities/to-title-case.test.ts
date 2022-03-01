import { toTitleCase } from "./to-title-case";

describe(toTitleCase.name, () => {
    const testCases = [
        ["one", "One"],
        ["two words", "Two Words"],
        ["and three words", "And Three Words"],
        ["sArCaStIc CaSe", "Sarcastic Case"],
        ["àéÎÑ", "Àéîñ"],
    ];
    test.each(testCases)(
        "should correctly convert %p to title case: %p", (input, output) => {
            expect(toTitleCase(input)).toEqual(output);
        });
});