import React, { useCallback, useState } from "react";
import { BASE_URL } from "../../utilities/base-url";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { usePOST } from "./usePost";
import { POST } from "./fetch";
import mocked = jest.mocked;

jest.mock("./fetch");

const endpoint = "people";

describe(usePOST.name, () => {
    let unmount: () => void;
    let abort1: () => void;
    let abort2: () => void;
    let ryan: Person;
    let user: UserEvent;
    let response: Response;
    let button: HTMLButtonElement;

    beforeEach(async () => {
        ryan = { name: "Ryan" };

        abort1 = jest.fn().mockName("abort1");
        abort2 = jest.fn().mockName("abort2");

        response = {
            ok: true,
            json: jest.fn().mockResolvedValue([ryan]),
        } as unknown as Response;

        mocked(POST)
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

        user = userEvent.setup();
    });

    describe("when the response is OK", () => {
        test("makes a POST call to the correct endpoint", async () => {
            await user.click(button);
            await waitFor(() => {
                expect(mocked(POST)).toHaveBeenCalledWith(`${BASE_URL()}/${endpoint}`, ryan);
            });
        });

        describe("and the response has a body", () => {
            beforeEach(async () => {
                await user.click(button);
            });

            test("resolves the value from the server", async () => {
                await waitFor(() => {
                    expect(screen.getByText(ryan.name)).toBeInTheDocument();
                });
            });
        });

        describe("and the response is empty", () => {
            beforeEach(async () => {
                mocked(response.json).mockRejectedValue(new SyntaxError("Unexpected end of JSON input"));
                await user.click(button);
            });

            test("does not throw an error", async () => {
                await waitFor(() => {
                    expect(screen.getByText("There was a successful, empty response")).toBeInTheDocument();
                });
            });
        });

        describe("and the request was aborted", () => {
            let abortRequest: (error: any) => void;
            beforeEach(async () => {
                const responsePromise = new Promise<Response>((resolve, reject) => {
                    abortRequest = reject;
                });

                mocked(POST)
                    .mockReset()
                    .mockReturnValueOnce({
                        abort: abort1,
                        responsePromise,
                    });
                await user.click(button);
            });

            test("does not throw an error or show one on the screen", async () => {
                abortRequest(new DOMException("Abortedd"));
                expect(screen.queryByText(ryan.name)).not.toBeInTheDocument();
                expect(screen.queryByText("There was a successful, empty response")).not.toBeInTheDocument();
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

    describe("when the response is not OK", () => {
        const errorMessage = "it failed";
        beforeEach(async () => {
            mocked(POST)
                .mockReset()
                .mockReturnValueOnce({
                    abort: abort1,
                    responsePromise: Promise.resolve({
                        json: jest.fn().mockResolvedValue({ error: errorMessage }),
                        ok: false,
                    } as unknown as Response),
                });
            await user.click(button);
        });
        test("sends the error message from the server to the component", async () => {
            await waitFor(() => {
                expect(screen.getByText(errorMessage)).toBeInTheDocument();
            });
        });
    });
});

type Person = { name: string };

const FetchingComponent = () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [emptyResponse, setEmptyResponse] = useState(false);
    const [error, setError] = useState<string>("");

    const postPerson = usePOST<Person[]>(endpoint);

    const onClick = useCallback(() => {
        postPerson({ name: "Ryan" }, (ok, body, error) => {
            if (ok) {
                if (body) {
                    setPeople(body);
                } else {
                    setEmptyResponse(true);
                }
            } else {
                setError(error);
            }
        });
    }, [postPerson]);

    return (<>
            {people && people.map(person => {
                return <span key={person.name}>{person.name}</span>;
            })}
            {error && <span data-testid={"error-container"}>{error}</span>}
            {emptyResponse && <span>There was a successful, empty response</span>}
            <button onClick={onClick}>post</button>
        </>
    );
};