import { DocumentStateContext, DocumentStateProvider } from "./DocumentStateContext";
import { render, screen } from "@testing-library/react";
import React, { useCallback, useContext } from "react";
import userEvent from "@testing-library/user-event";

describe("DocumentStateContext", () => {
    beforeEach(() => {
        render(
            <DocumentStateProvider>
                <ShowsDocumentState/>
            </DocumentStateProvider>
        );
    });
    test("provides the correct default value", () => {
        expect(screen.getByText(`Document is new: ${true}`)).toBeInTheDocument();
    });

    test("allows children to update the document state value", async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole("button"));

        expect(screen.getByText(`Document is new: ${false}`)).toBeInTheDocument();
    });
});

const ShowsDocumentState = () => {
    const { documentIsNew, documentHasBeenLoaded } = useContext(DocumentStateContext);

    const onClick = useCallback(() => {
        documentHasBeenLoaded();
    }, [documentHasBeenLoaded]);

    return (<>
        <p>{`Document is new: ${documentIsNew}`}</p>
        <button onClick={onClick}>UPDATE STATUE</button>
    </>);
};