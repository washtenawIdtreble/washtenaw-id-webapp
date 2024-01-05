import React from "react";
import { MainHeading } from "../../components/MainHeading";
import { AppLink } from "../../components/navigation/AppLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import "./WelcomePage.css";

export const WELCOME_PAGE_HEADING = "Washtenaw ID in Ann Arbor";

export const WelcomePage = () => {
    return (<>
        <MainHeading>{WELCOME_PAGE_HEADING}</MainHeading>
        <div className={"text-page-container"} data-testid={"information-container"}>
            <p className={"text-page-paragraph"}>All businesses in Ann Arbor are required to accept the Washtenaw
                County
                ID as proof of identity.</p>
            <p className={"text-page-paragraph"}>
                <AppLink className={"inline-link"} to={PAGE_ENDPOINTS.annArborLaw}>
                    Click here to learn more about Ann Arbor's law
                </AppLink>
            </p>
            <p className={"text-page-paragraph"}>
                If a business in Ann Arbor refused to accept your Washtenaw County ID, please tell us about your
                experience.&nbsp;
                <AppLink to={PAGE_ENDPOINTS.reportIdRefused} className={"inline-link"}>
                    Click here to contact us.
                </AppLink>
            </p>
        </div>
        <h2 className={"visually-hidden"}>Washtenaw ID Project Info Video</h2>
        <div className={"video-container"}>
            <iframe
                src="https://www.youtube-nocookie.com/embed/d76T3dwcm3M?si=4yTPVyjYmkAhYC7W&rel=0"
                title="Washtenaw County ID Welcome Video" frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={"video-iframe"}
            />
        </div>
        <div className={"text-page-container transcript-container"} data-testid={"transcript-container"}>
            <h3 className={"transcript-heading"}>Video Transcript</h3>
            <p className={"text-page-paragraph"}>
                The video above contains interviews with people involved in the Washtenaw ID Project. While each person
                is talking, we see them speaking directly to the camera.</p>
            <p className={"text-page-paragraph"}>
                <span
                    className={"transcript-speaker-name"}>Keta Cowan - Co-Founder and Chair, The Washtenaw ID Project:</span> "40,000
                individuals both
                citizens and undocumented folks lack an ID card in Washtenaw County. The Washtenaw ID Project is a local
                initiative to provide a government-issued ID card to those who cannot access a state ID."</p>
            <p className={"text-page-paragraph"}>
                <span className={"transcript-speaker-name"}>Jerry L. Clayton - Sheriff, Washtenaw County:</span> "My
                grandparents came up to live with my
                parents from the south. They didn't have a birth certificate. They didn't have a Social Security card."
            </p>
            <p className={"text-page-paragraph"}>
                <span
                    className={"transcript-speaker-name"}>Yousef Rabhi - Michigan State Representative, 53rd District:</span> "You
                don't have those
                privileges. You don't have those advantages."</p>
            <p className={"text-page-paragraph"}>
                <span
                    className={"transcript-speaker-name"}>Janelle Zini - Co-Founder, Washtenaw ID Project:</span> "Think
                about where you get asked for your
                ID - it's almost daily."</p>
            <p className={"text-page-paragraph"}>
                <span className={"transcript-speaker-name"}>Sheriff Clayton:</span> "Not being able to get a bank
                account, not being able to um sometimes
                secure uh a house or an apartment or a job."</p>
            <p className={"text-page-paragraph"}>
                <span className={"transcript-speaker-name"}>Laura Radzik - Assistant Vice President, Old National Bank:
                </span>"Old National accepts the Washtenaw ID as a primary form of identification meaning it works the
                same as if you had a driver's license or a passport."</p>
            <p className={"text-page-paragraph"}>
                <span className={"transcript-speaker-name"}>Rep. Rabhi:</span> "This ID card is really in my opinion the
                most American thing that we could do.
                It is the most in line with our values of who we are as a country."</p>
        </div>
    </>);
};
