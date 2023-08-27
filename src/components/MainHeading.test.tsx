import { MainHeading } from './MainHeading';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MAIN_HEADING_ID } from './MainHeading';

describe(MainHeading.name, () => {
    const headingText = 'Hello';
    const ariaLabelText = 'HeLlOooo';

    test('renders the children in an h1', () => {
        render(<MainHeading>{headingText}</MainHeading>);
        expect(
            screen.getByRole('heading', { level: 1, name: headingText })
        ).toBeVisible();
    });
    test('gives the h1 a tabindex of -1', () => {
        render(<MainHeading>{headingText}</MainHeading>);
        const heading = screen.getByRole('heading', {
            level: 1,
            name: headingText,
        });
        expect(heading.hasAttribute('tabindex')).toBe(true);
        expect(heading.tabIndex).toBe(-1);
    });
    test('passes the optional aria-label to the h1 element', () => {
        render(
            <MainHeading ariaLabel={ariaLabelText}>{headingText}</MainHeading>
        );
        const heading = screen.getByRole('heading', {
            level: 1,
            name: ariaLabelText,
        });
        expect(heading.textContent).toBe(headingText);
    });
    test('assigns constant id to the h1', () => {
        render(<MainHeading>{headingText}</MainHeading>);
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1.id).toBe(MAIN_HEADING_ID);
    });
    test('main heading id is main-heading', () => {
        render(<MainHeading>{headingText}</MainHeading>);
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1.id).toBe('main-heading');
    });
});
