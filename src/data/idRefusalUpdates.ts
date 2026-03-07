export type IdRefusalOutcome = {
    followedUpBy: string;
    date: string;
    result: string;
};

export type IdRefusalUpdate = {
    businessName: string;
    businessAddress: string;
    reportDate: string;
    outcome: IdRefusalOutcome;
};

export const idRefusalUpdates: IdRefusalUpdate[] = [
    {
        businessName: "CVS Pharmacy",
        businessAddress: "2000 Waters Road, Ann Arbor",
        reportDate: "January 2024",
        outcome: {
            followedUpBy: "Sarah Johnson",
            date: "January 15, 2024",
            result: "they recommitted to accepting the ID and training their staff to recognize it",
        },
    },
];
