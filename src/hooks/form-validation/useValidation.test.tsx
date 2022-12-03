import { useValidation, Validator } from "./useValidation";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useRef, useState } from "react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";

describe(useValidation.name, () => {
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
    });
    test("returns a validation that runs all validators passed in", async () => {
        const validators = [
            jest.fn().mockReturnValue("name is invalid"),
            jest.fn().mockReturnValue("email is invalid"),
            jest.fn().mockReturnValue("color is invalid"),
        ];

        render(<ValidatingComponent validators={validators} initialRefValue={{ value: "invalid input value" }}/>);

        await user.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText("name is invalid")).toBeInTheDocument();
        });
        expect(screen.getByText("email is invalid")).toBeInTheDocument();
        expect(screen.getByText("color is invalid")).toBeInTheDocument();
    });

    test("does nothing if there is no current value to the input ref", async () => {
        const validator = jest.fn().mockReturnValue("should not be called");

        render(<ValidatingComponent validators={[validator]} initialRefValue={null}/>);

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

            render(<ValidatingComponent validators={[validator]}
                                        initialRefValue={{ value: testCase }}/>);

            await user.click(screen.getByRole("button"));

            expect(validator).toHaveBeenCalledTimes(0);
        });
    });
});

type ValidatingComponentProps = {
    validators: Validator[]
    initialRefValue: { value: string | null | undefined } | null
}

const ValidatingComponent = ({ validators, initialRefValue }: ValidatingComponentProps) => {
    const inputRef = useRef<HTMLInputElement>(initialRefValue as HTMLInputElement);
    const [errorMessages, setErrorMessages] = useState([""]);
    const validation = useValidation({ validators, inputRef, setErrorMessages });

    const errorsElement = errorMessages.map(message => {
        return <span key={message}>{message}</span>;
    });

    const onClick = () => {
        validation();
    };

    return (<>
        {errorsElement}
        <button onClick={onClick}>SUBMIT</button>
    </>);
};