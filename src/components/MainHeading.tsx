import { ChildrenProps } from '../utilities/children-props';
import React from 'react';
import './MainHeading.css';

type MainHeadingProps = {
    ariaLabel?: string;
};

export const MAIN_HEADING_ID = 'main-heading';

export const MainHeading = ({
    ariaLabel,
    children,
}: MainHeadingProps & ChildrenProps) => {
    return (
        <div className={'main-heading-container'}>
            <h1 id={MAIN_HEADING_ID} aria-label={ariaLabel} tabIndex={-1}>
                {children}
            </h1>
        </div>
    );
};
