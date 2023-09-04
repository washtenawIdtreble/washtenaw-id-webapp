import { FormFieldElement } from "./FormField";
import { Validation } from "../../hooks/form-validation/useValidation";
import { RefObject } from "react";

export type Field = {
    inputRef: RefObject<FormFieldElement>
    validation: Validation,
    clear: () => void
}