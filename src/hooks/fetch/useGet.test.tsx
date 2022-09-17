import { useGET } from "./useGet";
import React, { useCallback, useState } from "react";
import { BASE_URL } from "../../utilities/base-url";
import { render, screen, waitFor } from "@testing-library/react";
import { GET } from "./fetch";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import mocked = jest.mocked;

jest.mock("./fetch");

const endpoint = "people";

describe(useGET.name, () => {
    let abort1: () => void;
    let abort2: () => void;
    let people: Person[];
    let user: UserEvent;
    let button: HTMLButtonElement;

    beforeEach(async () => {
        people = [
            { name: "Helen" },
            { name: "Matt" },
        ];

        abort1 = jest.fn().mockImplementation().mockName("abort1");
        abort2 = jest.fn().mockName("abort2");

        user = userEvent.setup();
    });

    describe("when the request succeeds", () => {
        let unmount: () => void;
        let response: Response;
        beforeEach(async () => {
            response = {
                ok: true,
                json: jest.fn().mockResolvedValue(people),
            } as unknown as Response;

            mocked(GET)
                .mockReturnValueOnce({
                    abort: abort1,
                    responsePromise: Promise.resolve(response),
                })
                .mockReturnValueOnce({
                    abort: abort2,
                    responsePromise: Promise.resolve(response),
                });

            ({ unmount } = render(<FetchingComponent/>));

            button = screen.getByRole("button");
        });
        test("makes a GET call to the correct endpoint", async () => {
            await user.click(button);
            await waitFor(() => {
                expect(mocked(GET)).toHaveBeenCalledWith(`${BASE_URL()}/${endpoint}`);
            });
        });
        describe("and the response has a body", () => {
            beforeEach(async () => {
                await user.click(button);
            });
            test("resolves the value from the server", async () => {
                await user.click(button);
                expect(screen.getByText(people[0].name)).toBeInTheDocument();
                expect(screen.getByText(people[1].name)).toBeInTheDocument();
            });
        });

        describe("and the response is empty", () => {
            beforeEach(async () => {
                mocked(response.json).mockRejectedValue(new SyntaxError("Unexpected end of JSON input"));
                await user.click(button);
            });

            test("does not throw an error", async () => {
                await waitFor(() => {
                    expect(screen.getByText(`There was an error getting the resource from ${BASE_URL()}/${endpoint}`)).toBeInTheDocument();
                });
            });
        });

        describe("and the request was aborted", () => {
            let abortRequest: (error: any) => void;
            beforeEach(async () => {
                const responsePromise = new Promise<Response>((resolve, reject) => {
                    abortRequest = reject;
                });

                mocked(GET)
                    .mockReset()
                    .mockReturnValueOnce({
                        abort: abort1,
                        responsePromise,
                    });
                await user.click(button);
            });

            test("does not throw an error or show one on the screen", async () => {
                abortRequest(new DOMException("Abortedd"));
                expect(screen.queryByText(people[0].name)).not.toBeInTheDocument();
                expect(screen.queryByText(people[1].name)).not.toBeInTheDocument();
                expect(screen.queryByText(`There was an error getting the resource from ${BASE_URL()}/${endpoint}`)).not.toBeInTheDocument();
                expect(screen.queryByTestId("error-container")).not.toBeInTheDocument();
            });
        });
        describe("when unmounted", () => {
            test("aborts the request", async () => {
                await user.click(button);
                unmount();
                expect(abort1).toHaveBeenCalledTimes(1);
            });
        });
        describe("when called multiple times and unmounted", () => {
            test("aborts all the requests", async () => {
                await user.click(button);
                await user.click(button);
                unmount();
                expect(abort1).toHaveBeenCalledTimes(1);
                expect(abort2).toHaveBeenCalledTimes(1);
            });
        });
    });
    describe("when the request fails", () => {
        const errorMessage = "it failed";
        beforeEach(async () => {
            const response = {
                ok: false,
                json: jest.fn().mockResolvedValue({ error: errorMessage }),
            } as unknown as Response;

            mocked(GET).mockReturnValue({
                abort: abort1,
                responsePromise: Promise.resolve(response),
            });

            render(<FetchingComponent/>);

            button = screen.getByRole("button");
        });
        test("rejects with the value from the server", async () => {
            await user.click(button);
            await waitFor(() => {
                expect(screen.getByText(errorMessage)).toBeInTheDocument();
            });
        });
    });
});

type Person = { name: string };

const FetchingComponent = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [error, setError] = useState<string>("");
    const getPeople = useGET<Person[]>(endpoint);

    const onClick = useCallback(() => {
        getPeople((ok, people, error) => {
            if (ok) {
                setPeople(people);
            } else {
                setError(error);
            }
        });
    }, [getPeople]);

    return (<>
            {people && people.map(person => {
                return <span key={person.name}>{person.name}</span>;
            })}
            {error && <span data-testid={"error-container"}>{error}</span>}
            <button onClick={onClick}>get</button>
        </>
    );
};