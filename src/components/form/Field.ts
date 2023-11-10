import { Validation } from "../../hooks/form-validation/useValidation";

export type Field = {
    validation: Validation,
    clear: () => void,
    focus: () => void,
}
