import { FormEvent } from "react";
import { POST } from "../utilities/fetch";
import { BASE_URL } from "../utilities/base-url";

type OnSubmitFunction = (event: FormEvent<any>) => void;
type UseForm = {
    onSubmit: OnSubmitFunction;
}

export const useForm = (submitEndpoint: string): UseForm => {
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = extractFormData(event.target as HTMLFormElement);

        POST(`${BASE_URL()}/${submitEndpoint}`, formData);
    };

    return { onSubmit };
};

function extractFormData(form: HTMLFormElement) {
    const formData = new FormData(form);

    const output: any = {};

    for (const formEntry of formData) {
        output[formEntry[0]] = formEntry[1];
    }

    return output;
}