import { useLiveRegionText } from "./useLiveRegionText";
import React, { useCallback } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";

describe(useLiveRegionText.name, () => {
    let user: UserEvent;
    let button: HTMLButtonElement;

    beforeEach(() => {
        user = userEvent.setup();
        render(<UsesLiveRegionTextHook/>);
        button = screen.getByRole("button", { name: "SET TEXT" });
    });
    test("propagates new text back to consumer", async () => {
        await user.click(button);

        expect(await screen.findByText("hello")).toBeInTheDocument();
    });
    test("sets the text back to empty string after a timeout", async () => {
        await user.click(button);

        const liveRegion = await screen.findByText("hello");
        expect(liveRegion).toBeInTheDocument();
        await waitFor(() => {
            expect(liveRegion.textContent).toEqual("");
        });
    });
});

const UsesLiveRegionTextHook = () => {
    const [text, setText] = useLiveRegionText("");

    const onClick = useCallback(() => {
        setText("hello");
    }, [setText]);

    return (<>
        <span data-testid={"live-region"}>{text}</span>
        <button onClick={onClick}>SET TEXT</button>
    </>);
};
