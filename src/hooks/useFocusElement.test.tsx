import React, { useCallback, useRef } from "react";
import { useFocusElement } from "./useFocusElement";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(useFocusElement.name, () => {
    test("focuses element within 100 milliseconds of process.env.FOCUS_TIMEOUT", async () => {
        const user = userEvent.setup();
        render(<FocusingComponent/>);

        await user.click(screen.getByRole("button"));

        const start = new Date();

        await waitFor(() => {
            expect(screen.getByRole("textbox")).toHaveFocus();
        });

        const end = new Date();

        const duration = end.getTime() - start.getTime();

        expect(duration - 100).toBeLessThan(parseInt(process.env.FOCUS_TIMEOUT!));
        expect(duration + 100).toBeGreaterThan(parseInt(process.env.FOCUS_TIMEOUT!));
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