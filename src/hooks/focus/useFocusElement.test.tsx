import React, { useCallback, useRef } from "react";
import { useFocusElement } from "./useFocusElement";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(useFocusElement.name, () => {
    test("focuses element", async () => {
        const user = userEvent.setup();
        render(<FocusingComponent/>);

        await user.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByRole("textbox")).toHaveFocus();
        });
    });
});

const FocusingComponent = () => {
    const elementToFocus = useRef(null);
    const focusElement = useFocusElement();

    const onClick = useCallback(() => {
        focusElement(elementToFocus);
    }, [focusElement]);

    return (<>
        <input ref={elementToFocus}/>
        <button onClick={onClick}>FOCUS</button>
    </>);
};