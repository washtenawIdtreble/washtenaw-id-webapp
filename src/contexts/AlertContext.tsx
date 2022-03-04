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
    const onDismiss = () => {
        setAlert(undefined);
    };

    return (
        <div data-testid={"alert-context-provider"}>
            <AlertContext.Provider value={{ showAlert: setAlert }}>
                {alert &&
                    <Alert
                        heading={{ level: 1, text: <>{alert.heading}</> }}
                        show={true}
                    >
                        <AlertContent>{alert.message}</AlertContent>
                        <AlertActions>
                            <Button onClick={onDismiss}>OK</Button>
                        </AlertActions>
                    </Alert>
                }
                {children}
            </AlertContext.Provider>
        </div>
    );
}