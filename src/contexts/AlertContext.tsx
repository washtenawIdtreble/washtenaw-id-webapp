import React, { useCallback, useState } from "react";
import { Button } from "reakit/Button";
import { Dialog, DialogBackdrop, useDialogState } from "reakit/Dialog";
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

    const showAlert = useCallback((alertData: AlertData) => setAlert(alertData), []);
    const onDismiss = useCallback(() => setAlert(undefined), []);
    const dialog = useDialogState({ visible: true });
    return (<>
            <AlertContext.Provider value={{ showAlert: showAlert }} data-testid={"alert-context-provider"}>
                {alert &&
                    <DialogBackdrop {...dialog} className={"alert-dialog"}>
                        <Dialog {...dialog}
                                aria-label="Error"
                                className={"Dialog__inner"}>
                            <h1 className={"Dialog__header"}>{alert.heading}</h1>
                            <p className={"alert-dialog-content"}>{alert.message}</p>
                            <footer className={"alert-dialog-footer"}><Button onClick={onDismiss}>OK</Button></footer>
                        </Dialog>
                    </DialogBackdrop>
                }
                {children}
            </AlertContext.Provider>
        </>
    );
}