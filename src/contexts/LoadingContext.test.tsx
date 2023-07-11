import React, { useContext, useState } from "react";
import { LoadingContext, LoadingContextProvider } from "./LoadingContext";
import { render, screen } from "@testing-library/react";
import { ChildrenProps } from "../utilities/children-props";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";

describe("LoadingContext", () => {
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
        render(
            <StubProvider>
                <StubComponent/>
            </StubProvider>
        );
    });
    test("provides method to start loading", async () => {
        const startButton = screen.getByRole("button", { name: "Start Loading" });
        await user.click(startButton);

        expect(screen.getByText("LOADING: true")).toBeInTheDocument();
    });
    test("provides method to finish loading", async () => {
        const startButton = screen.getByRole("button", { name: "Start Loading" });
        await user.click(startButton);

        const finishButton = screen.getByRole("button", { name: "Finish Loading" });
        await user.click(finishButton);

        expect(screen.getByText("LOADING: false")).toBeInTheDocument();
    });
});

const StubProvider = ({ children }: ChildrenProps) => {
    const [isLoading, setIsLoading] = useState(false);
    return (<>
        <LoadingContextProvider setIsLoading={setIsLoading}>
            LOADING: {isLoading ? "true" : "false"}
            {children}
        </LoadingContextProvider>
    </>);
};

const StubComponent = () => {
    const { startLoading, finishLoading } = useContext(LoadingContext);

    return (<>
        <button onClick={startLoading}>Start Loading</button>
        <button onClick={finishLoading}>Finish Loading</button>
    </>);
};
