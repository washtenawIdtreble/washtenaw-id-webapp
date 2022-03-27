import React, { useState } from "react";
import { Alert, AlertActions, AlertContent, Button } from "@deque/cauldron-react";
import "./AlertContext.css";

export type AlertData = {
    heading: string;
    message: string;
}
export type AlertContextValue = {
    showAlert: (alert: AlertData) => void;
}
const DEFAULT_ALERT_CONTEXT: AlertContextValue = {
    showAlert: () => {},
};
export const AlertContext = React.createContext<AlertContextValue>(DEFAULT_ALERT_CONTEXT);

type Props = { children: React.ReactNode }

export function AlertProvider({ children }: Props) {
    const [alert, setAlert] = useState<AlertData | undefined>(undefined);

    const showAlert = (x: AlertData) => {
        setAlert(x);
    };

    const onDismiss = () => {
        setAlert(undefined);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {alert &&
                <Alert
                    heading={{ level: 1, text: <>{alert.heading}</> }}
                    show={true}
                    className={"alert-dialog"}
                >
                    <AlertContent className={"alert-dialog-content"}>{alert.message}</AlertContent>
                    <AlertActions className={"alert-dialog-footer"}>
                        <Button className={"alert-dialog-button"} onClick={onDismiss}>OK</Button>
                    </AlertActions>
                </Alert>
            }
            {children}
        </AlertContext.Provider>
    );
}