import { rest } from "msw";
import { productionCategoriesResolver } from "./resolvers/categories-resolver";
import { accessibilityIssuesResolver } from "./resolvers/accessibility-report-resolver";

export const handlers = [
    rest.get("/categories", productionCategoriesResolver()),
    rest.post("/accessibility-issues", accessibilityIssuesResolver()),
];