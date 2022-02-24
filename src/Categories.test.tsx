import Categories from './Categories'
import { render, screen, within } from '@testing-library/react';

describe(Categories.name, () => {
    test("contains a list of categories", () => {
        render(<Categories/>);
        const listElement = screen.getByRole("list");
        expect(listElement).toBeInTheDocument();

        const listItems = within(listElement).getAllByRole("listitem");
        expect(listItems.length).toEqual(3);
        expect(listItems[0].textContent).toEqual("cranberry");
        expect(listItems[1].textContent).toEqual("blueberry");
        expect(listItems[2].textContent).toEqual("banana");
    });
});

