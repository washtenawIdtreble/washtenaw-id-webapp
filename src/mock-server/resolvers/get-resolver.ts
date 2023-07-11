import { RequestResolver } from "../test-server-handlers";
import { ResponseContent } from "./types";

export type GetResolverArgs = {
    responseContent: ResponseContent
    delayUntil: Promise<ResponseContent>
    delayMilliseconds: number
}

const DEFAULT_STATUS_CODE = 200;

export const buildGetResolver = <RequestBody>(args: Partial<GetResolverArgs> = { delayMilliseconds: 0 }): RequestResolver => {
    return async (request, response, context) => {
        let responseContent: ResponseContent = {
            statusCode: DEFAULT_STATUS_CODE,
            ...args.responseContent,
        };
        if (args.delayUntil) {
            const delayedContent = await args.delayUntil;
            responseContent = {
                ...responseContent,
                ...delayedContent,
            };
        }

        return response(
            context.status(responseContent.statusCode),
            context.json(responseContent.body ?? {}),
            context.delay(args.delayMilliseconds),
        );
    };
};
