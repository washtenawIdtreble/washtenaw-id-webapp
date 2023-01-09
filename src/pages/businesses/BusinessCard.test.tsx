import { BusinessCard } from "./BusinessCard";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { Business } from "../../hooks/useBusinesses";
import { stubBusiness } from "../../../test/test-factories";

describe(BusinessCard.name, () => {
    let business: Business;
    let businessAddress: string;
    let tableElement: HTMLTableElement;
    beforeEach(() => {
        business = stubBusiness();
        businessAddress = `${business.address}, ${business.city}, ${business.state} ${business.zip}`;
        render(<BusinessCard business={business}/>);
        tableElement = screen.getByRole("table", { name: business.name });
    });
    test("shows business' name as a table's name", () => {
        expect(tableElement).toBeVisible();
    });
    describe("table data", () => {
        let rows: HTMLTableRowElement[];
        beforeEach(() => {
            rows = within(screen.getByRole("rowgroup")).getAllByRole("row");
        });
        test("shows the business' address", () => {
            const addressRow = rows[0];
            expect(within(addressRow).getByRole("rowheader", { name: "Address" })).toBeVisible();
            expect(within(addressRow).getByRole("cell", { name: businessAddress })).toBeVisible();
        });
        test("business address is a link to Google Maps", () => {
            const addressRow = rows[0];
            const addressCell = within(addressRow).getByRole("cell", { name: businessAddress });
            const addressLink: HTMLAnchorElement = within(addressCell).getByRole("link", { name: businessAddress });

            const urlEscapedAddress = businessAddress
                .replace(/ /g, "%20")
                .replace(/,/g, "%2C");

            expect(addressLink.href).toEqual(`https://www.google.com/maps/dir/?api=1&destination=${urlEscapedAddress}`);
            expect(addressLink.target).toEqual(`_blank`);
            expect(addressLink.rel).toEqual(`noreferrer`);
        });
        test("shows the business' website", () => {
            const websiteRow = rows[1];
            expect(within(websiteRow).getByRole("rowheader", { name: "Website" })).toBeVisible();

            const shortWebsite = business.website.replace(/http[s]?:\/\//g, "");
            const websiteCell = within(websiteRow).getByRole("cell", { name: shortWebsite });
            expect(websiteCell).toBeVisible();

            const websiteLink: HTMLAnchorElement = within(websiteCell).getByRole("link", { name: shortWebsite });
            expect(websiteLink.href).toEqual(`${business.website}/`);
            expect(websiteLink.target).toEqual(`_blank`);
            expect(websiteLink.rel).toEqual(`noreferrer`);
        });
        test("shows the business' phone number", () => {
            const phoneRow = rows[2];
            expect(within(phoneRow).getByRole("rowheader", { name: "Phone" })).toBeVisible();

            const phoneCell = within(phoneRow).getByRole("cell", { name: business.phone });
            expect(phoneCell).toBeVisible();

            const phoneLink: HTMLAnchorElement = within(phoneCell).getByRole("link", { name: business.phone });
            expect(phoneLink.href).toEqual(`tel:${business.phone}`);
        });
        test("shows the business' description", () => {
            const descriptionRow = rows[3];
            expect(within(descriptionRow).getByRole("rowheader", { name: "About" })).toBeVisible();
            expect(within(descriptionRow).getByRole("cell", { name: business.description })).toBeVisible();
        });
    });
});