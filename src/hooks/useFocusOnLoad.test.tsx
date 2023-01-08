import React from "react";
import { useFocusOnLoad } from "./useFocusOnLoad";
import { render, screen, waitFor } from "@testing-library/react";
import { asyncTimeout } from "../../test/async-timeout";

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

            await asyncTimeout(20);

            expect(button).not.toHaveFocus();
        });

        test("does nothing if element ID is empty", async () => {
            const originalGetElementByID = document.getElementById;
            document.getElementById = jest.fn();

            render(<StubComponent elementId={""}/>);

            await asyncTimeout(20);

            expect(document.getElementById).toHaveBeenCalledTimes(0);

            document.getElementById = originalGetElementByID;
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