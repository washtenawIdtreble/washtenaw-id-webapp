import { rest } from "msw";
import { productionCategoriesResolver } from "./categories-resolver";

export const handlers = [
    rest.get("/categories", productionCategoriesResolver()),
];