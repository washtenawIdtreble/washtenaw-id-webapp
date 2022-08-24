import { RequestResolver } from "../test-server-handlers";

export type ResponseContent = {
    statusCode: number
    body?: any
}

export type RequestCaveats<T> = (requestBody: T) => ResponseContent | undefined

export type PostResolverArgs<RequestBody> = {
    responseContent: ResponseContent
    captor: (body: RequestBody) => void
    delayUntil: Promise<ResponseContent>
    requestCaveats: Array<RequestCaveats<RequestBody>>
}

const DEFAULT_STATUS_CODE = 200;

export const buildPostResolver = <RequestBody>(args: Partial<PostResolverArgs<RequestBody>> = {}): RequestResolver => {
    return async (request, response, context) => {
        const requestBody = request.body as RequestBody;
        if (args.captor) {
            args.captor(requestBody);
        }

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

        if (args.requestCaveats) {
            for (const exception of args.requestCaveats) {
                const failureResponse = exception(requestBody);
                if (failureResponse) {
                    return response(context.status(failureResponse.statusCode), context.json(failureResponse.body));
                }
            }
        }

        return response(
            context.status(responseContent.statusCode),
            context.json(responseContent.body),
        );
    };
};