import React from "react";
import { useFocusOnLoad } from "./useFocusOnLoad";
import { render, screen, waitFor } from "@testing-library/react";

describe(useFocusOnLoad.name, () => {
    describe("on element found within the interval", () => {
        beforeEach(() => {
            (render(<StubComponent elementId={"button-id"}/>));
        });
        test("focuses on the element", async () => {
            const button = screen.getByRole("button", { name: "ElementToFocus" });

            await waitFor(() => {
                expect(button).toHaveFocus();
            });
            expect(button.scrollIntoView).toHaveBeenCalled();
        });
    });

    describe("on element not found within the interval", () => {
        test("focus does not change", async () => {
            render(<StubComponent elementId={"non-existent-element-id"}/>);

            const button = screen.getByRole("button", { name: "ElementToFocus" });

            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(null);
                }, 80);
            });
            expect(button).not.toHaveFocus();
        });
    });
});

type StubComponentProps = { elementId: string };

function StubComponent({ elementId }: StubComponentProps) {
    useFocusOnLoad(elementId);
    return (
        <div>
            <button id="button-id">ElementToFocus</button>
        </div>
    );
}