import { rest } from "msw";
import { productionCategoriesResolver } from "./categories-resolver";
import { productionBusinessesResolver } from "./businesses-resolver";

export const handlers = [
    rest.get("/categories", productionCategoriesResolver()),
    rest.get("/businesses", productionBusinessesResolver()),
];