import { BusinessCard } from "./BusinessCard";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Business } from "../../hooks/useBusinesses";
import { stubBusiness } from "../../../test/test-factories";
import { OPENS_IN_A_NEW_TAB } from "../../components/OpensInNewTab/OpensInANewTabLink";

describe(BusinessCard.name, () => {
    let business: Business;
    beforeEach(() => {
        business = stubBusiness();
        render(<BusinessCard business={business}/>);
    });
    test("shows business' name as a heading", () => {
        expect(screen.getByRole("heading", { level: 3, name: business.name })).toBeVisible();
    });
    describe("address", () => {
        let businessAddress: string;
        let urlEscapedAddress: string;
        let addressBox: HTMLDivElement;
        let addressLink: HTMLAnchorElement;

        beforeEach(() => {
            businessAddress = `${business.address}, ${business.city}, ${business.state} ${business.zip}`;
            urlEscapedAddress = businessAddress
                .replace(/ /g, "%20")
                .replace(/,/g, "%2C")
                .replace(/'/g, "%27");

            addressBox = screen.getByText("Address");
            addressLink = screen.getByRole("link", { name: `${businessAddress} ${OPENS_IN_A_NEW_TAB}` });
        });
        test("shows the address label", () => {
            expect(addressBox).toBeVisible();
        });
        test("shows the address link", () => {
            expect(addressLink).toBeVisible();
        });
        test("links to google maps", () => {
            expect(addressLink.href).toEqual(`https://www.google.com/maps/dir/?api=1&destination=${urlEscapedAddress}`);
        });
        test("opens in a new tab", () => {
            expect(addressLink.target).toEqual(`_blank`);
            expect(addressLink.rel).toEqual(`noreferrer`);
        });
    });
    describe("website", () => {
        let websiteBox: HTMLDivElement;
        let websiteLink: HTMLAnchorElement;
        let shortWebsite: string;

        beforeEach(() => {
            shortWebsite = business.website.replace(/http[s]?:\/\//g, "");
            websiteBox = screen.getByText("Website");
            websiteLink = screen.getByRole("link", { name: `${shortWebsite} ${OPENS_IN_A_NEW_TAB}` });
        });
        test("shows the website label", () => {
            expect(websiteBox).toBeVisible();
        });
        test("shows the website link", () => {
            expect(websiteLink).toBeVisible();
        });
        test("links to the business' website", () => {
            expect(websiteLink.href).toEqual(`${business.website}/`);
        });
        test("opens in a new tab", () => {
            expect(websiteLink.target).toEqual(`_blank`);
            expect(websiteLink.rel).toEqual(`noreferrer`);
        });
    });
    describe("phone", () => {
        let phoneBox: HTMLDivElement;
        let phoneLink: HTMLAnchorElement;

        beforeEach(() => {
            phoneBox = screen.getByText("Phone");
            phoneLink = screen.getByRole("link", { name: business.phone });
        });
        test("shows the phone label", () => {
            expect(phoneBox).toBeVisible();
        });
        test("shows the phone link", () => {
            expect(phoneLink).toBeVisible();
        });
        test("has a tel link", () => {
            expect(phoneLink.href).toEqual(`tel:${business.phone}`);
        });
    });
    describe("description", () => {
        test("shows the description label", () => {
            expect(screen.getByText("About")).toBeVisible();
        });
        test("shows the description", () => {
            expect(screen.getByText(business.description)).toBeVisible();
        });
    });
});
