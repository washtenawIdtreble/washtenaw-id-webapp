import { useLocalStorage } from './useLocalStorage';
import React, { useCallback } from 'react';
import { render, screen } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import  userEvent from '@testing-library/user-event';

const valueToSave : string = 'Hello!';
const storageKey: string = "Greeting";

describe(useLocalStorage.name, () => {
    let user : UserEvent;
    
    beforeEach(() => {
        user = userEvent.setup();
    });
    
    afterEach(() => {
        window.localStorage.clear();
    });

    it('saves to local storage', async () => {
        render(<StubComponent/>);
        const buttonElement = screen.getByRole('button', { name: 'Save' });
        await user.click(buttonElement);

        expect(window.localStorage.getItem(storageKey)).toBe(valueToSave);
        expect(screen.getByText(valueToSave)).toBeVisible();
    });

    it('deletes from local storage', async () => {
        render(<StubComponent/>);
        const buttonElement = screen.getByRole('button', { name: 'Remove' });
        await user.click(buttonElement);

        expect(window.localStorage.getItem(storageKey)).toBe(null);
    });

    it('sets empty string when value is not in local storage', () => { 
        render(<StubComponent/>);

        expect(screen.getByTestId("currentValue").textContent).toBe("");
    });

    it('reads from local storage', async () => {
        window.localStorage.setItem(storageKey, valueToSave);
        render(<StubComponent/>);

        expect(screen.getByText(valueToSave)).toBeVisible();
    });
});

function StubComponent () {
    const { save, currentValue, remove } = useLocalStorage(storageKey);

    const saveToLocalStorage = useCallback(() => {
        save(valueToSave);
    }, [save]);

    const removeFromLocalStorage = useCallback(() => {
        remove();
    }, [save]);

    return (
        <div> 
            <button onClick={saveToLocalStorage}>Save</button>
            <button onClick={removeFromLocalStorage}>Remove</button>
            <span data-testid="currentValue">{currentValue === null ? "null" : currentValue}</span>
        </div>
    );
};
