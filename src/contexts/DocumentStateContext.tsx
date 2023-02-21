import React, { useCallback, useState } from "react";
import { ChildrenProps } from "../utilities/children-props";

type DocumentStateContextValue = {
    documentIsNew: boolean,
    documentHasBeenLoaded: () => void
}
const defaultValue: DocumentStateContextValue = {
    documentIsNew: true,
    documentHasBeenLoaded: () => {throw new Error("Missing provider for the DocumentStateContext");}
};
export const DocumentStateContext = React.createContext<DocumentStateContextValue>(defaultValue);

export const DocumentStateProvider = ({ children }: ChildrenProps) => {
    const [documentIsNew, setdocumentIsNew] = useState(true);

    const documentHasBeenLoaded = useCallback(() => {
        setdocumentIsNew(false);
    }, []);

    return (
        <DocumentStateContext.Provider value={{ documentIsNew, documentHasBeenLoaded }}>
            {children}
        </DocumentStateContext.Provider>
    );
};