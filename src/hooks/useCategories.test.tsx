import { render } from "@testing-library/react";
import useCategories from "./useCategories";


describe(useCategories.name, ()=> {
    test("should return a list of categories", () => {
        render(<StubComponent></StubComponent>);
        expect(categories).toEqual(["cranberries", "banana", "cherry"]);
    });
});

let categories: string[];
function StubComponent() {
    categories = useCategories();
    return (
         <div></div>
    );
}