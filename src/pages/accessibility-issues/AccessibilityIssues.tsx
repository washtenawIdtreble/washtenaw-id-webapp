import React, { useState } from 'react';
import '../Pages.css';
import { Form } from '../../components/form/Form';
import { SERVER_ENDPOINTS } from '../../utilities/server-endpoints';
import { FormField, FormFieldType } from '../../components/form/FormField';
import { validateEmail } from '../../hooks/form-validation/validateEmail';
import { validatePhone } from '../../hooks/form-validation/validatePhone';
import { validateRequired } from '../../hooks/form-validation/validateRequired';
import { MainHeading } from '../../components/MainHeading';
import { MAIN_HEADING_ID } from '../../components/MainHeading';

export type AccessibilityFormData = {
    name?: string;
    email?: string;
    phone?: string;
    description: string;
};

export const ACCESSIBILITY_PAGE_HEADING = 'Report Accessibility Issues';
export const ACCESSIBILITY_PAGE_IDENTIFIER = 'accessibility-issues';

export const AccessibilityIssues = () => {
    const [successMessage] = useState(
        'Your issue has been reported, thank you!'
    );
    return (
        <>
            <MainHeading>{ACCESSIBILITY_PAGE_HEADING}</MainHeading>

            <Form
                successMessage={successMessage}
                ariaLabelledBy={MAIN_HEADING_ID}
                submitEndpoint={SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}
            >
                <label htmlFor={'name'} className={'form-label'}>
                    Your Name (optional)
                </label>
                <FormField id={'name'} 
                    pageIdentifier={ACCESSIBILITY_PAGE_IDENTIFIER} 
                    autoComplete={'name'} 
                    name={'name'} />
                <label htmlFor={'email'} className={'form-label'}>
                    Your email (optional)
                </label>
                <FormField
                    id={'email'}
                    pageIdentifier={ACCESSIBILITY_PAGE_IDENTIFIER}
                    name={'email'}
                    validator={validateEmail}
                    autoComplete={'email'}
                />
                <label htmlFor={'phone'} className={'form-label'}>
                    Your phone number (optional)
                </label>
                <FormField
                    id={'phone'}
                    pageIdentifier={ACCESSIBILITY_PAGE_IDENTIFIER}
                    name={'phone'}
                    validator={validatePhone}
                    autoComplete={'tel'}
                />
                <label htmlFor={'description'} className={'form-label'}>
                    What do you want to tell us? (required)
                </label>
                <FormField
                    id={'description'}
                    pageIdentifier={ACCESSIBILITY_PAGE_IDENTIFIER}
                    name={'description'}
                    validator={validateRequired}
                    inputType={FormFieldType.TEXTAREA}
                />
            </Form>
        </>
    );
};
