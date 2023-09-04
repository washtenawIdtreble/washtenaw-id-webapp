import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FormContext, FormProvider } from "./FormContext";
import { render, screen, waitFor } from "@testing-library/react";
import { ChildrenProps } from "../utilities/children-props";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { Observable } from "../utilities/observable";

const validValue = "valid";
const nameLabel = "NAME";
const colorLabel = "COLOR";
const cityLabel = "CITY";

describe("Form Context", () => {
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
        render(<TestPageComponent/>);
    });
    test("Runs all validations when the onSubmit is triggered", async () => {
        const submit = screen.getByRole("button", { name: "SUBMIT" });
        await user.click(submit);
        expect(await screen.findByText(`${nameLabel} input is invalid`)).toBeInTheDocument();
        expect(screen.getByText(`${colorLabel} input is invalid`)).toBeInTheDocument();
        expect(screen.getByText(`${cityLabel} input is invalid`)).toBeInTheDocument();
    });
    test("Notifies observer when onClear is triggered", async () => {
        const clear = screen.getByRole("button", { name: "CLEAR" });
        await user.click(clear);
        const clearedElements = await screen.findAllByText("CLEARED: true");
        expect(clearedElements.length).toBe(3);
    });
    test("Returns the value to the obervable", async () => {
        expect(screen.getByText("OBSERVED: false")).toBeVisible();

        const submit = screen.getByRole("button", { name: "SUBMIT" });
        await user.click(submit);

        await waitFor(() => {
            expect(screen.getByText("OBSERVED: true")).toBeVisible();
        });
    });
    test("Focuses earliest input that has an error", async () => {
        const nameInput = screen.getByLabelText(nameLabel);
        await user.type(nameInput, validValue);

        const colorInput = screen.getByLabelText(colorLabel);

        const submit = screen.getByRole("button", { name: "SUBMIT" });
        await user.click(submit);

        await waitFor(() => {
            expect(colorInput).toHaveFocus();
        });
    });
});

const TestFormWithProvider = ({ children }: ChildrenProps) => {
    const [onSubmitObservable] = useState(new Observable());
    const [onClearObservable] = useState(new Observable());
    const [observed, setObserved] = useState("false");

    const onSubmit = useCallback(() => {
        const observableResult = onSubmitObservable.notify();
        if (observableResult === true) {
            setObserved("true");
        }
    }, [onSubmitObservable]);

    const onClear = useCallback(() => {
        onClearObservable.notify();
    }, []);

    return (<FormProvider onSubmit={onSubmitObservable} onClear={onClearObservable}>
        {children}
        <span>OBSERVED: {observed}</span>
        <button onClick={onSubmit}>SUBMIT</button>
        <button onClick={onClear}>CLEAR</button>
    </FormProvider>);
};

const TestInputFormConsumer = ({ label }: { label: string }) => {
    const { registerField } = useContext(FormContext);
    const input = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [cleared, setCleared] = useState("false");

    const validation = useCallback(() => {
        if (input.current!.value === validValue) {
            setErrorMessage("");
            return "";
        }

        const message = `${label} input is invalid`;
        setErrorMessage(message);
        return message;
    }, [label]);

    const clear = useCallback(() => {
        setCleared("true");
    }, []);

    useEffect(() => {
        registerField({ validation, inputRef: input, clear });
    }, [registerField, validation]);

    return (<>
        <label>{label}
            <input ref={input}/>
        </label>
        {errorMessage &&
            <span>{errorMessage}</span>
        }
        <span>CLEARED: {cleared}</span>
    </>);
};

const TestPageComponent = () => {
    return (<>
        <TestFormWithProvider>
            <TestInputFormConsumer label={nameLabel}/>
            <TestInputFormConsumer label={colorLabel}/>
            <TestInputFormConsumer label={cityLabel}/>
        </TestFormWithProvider>
    </>);
};