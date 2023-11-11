import { NO_OP_VALIDATION, useValidation, Validator } from "./useValidation";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useRef, useState } from "react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";

describe(useValidation.name, () => {
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
    });

    test("has a no-op validation", () => {
        const errorMessage = NO_OP_VALIDATION();
        expect(errorMessage).toEqual("");
    });

    test("returns a validation that runs the validator passed in", async () => {
        const validator = jest.fn().mockReturnValue("name is invalid");

        render(<ValidatingComponent validator={validator} initialRefValue={{ value: "invalid input value" }}/>);

        await user.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText("name is invalid")).toBeInTheDocument();
        });
    });

    test("returns a validation that does nothing if no validator was passed in", async () => {
        render(<ValidatingComponent initialRefValue={{ value: "invalid input value" }}/>);
        await user.click(screen.getByRole("button"));
    });

    test("does nothing if there is no current value to the input ref", async () => {
        const validator = jest.fn().mockReturnValue("should not be called");

        render(<ValidatingComponent validator={validator} initialRefValue={null}/>);

        await user.click(screen.getByRole("button"));

        expect(validator).toHaveBeenCalledTimes(0);
    });

    const emptyValueTestCases = [
        null,
        undefined,
    ];
    emptyValueTestCases.forEach(testCase => {
        test(`does nothing if the input ref's value is ${testCase}`, async () => {
            const validator = jest.fn().mockReturnValue("should not be called");

            render(<ValidatingComponent validator={validator} initialRefValue={{ value: testCase }}/>);

            await user.click(screen.getByRole("button"));

            expect(validator).toHaveBeenCalledTimes(0);
        });
    });
});

type ValidatingComponentProps = {
    validator?: Validator
    initialRefValue: { value: string | null | undefined } | null
}

const ValidatingComponent = ({ validator, initialRefValue }: ValidatingComponentProps) => {
    const inputRef = useRef<HTMLInputElement>(initialRefValue as HTMLInputElement);
    const [errorMessage, setErrorMessage] = useState("");
    const validation = useValidation({ validator, inputRef, setErrorMessage });

    const onClick = () => {
        validation();
    };

    return (<>
        <span>{errorMessage}</span>
        <button onClick={onClick}>SUBMIT</button>
    </>);
};
