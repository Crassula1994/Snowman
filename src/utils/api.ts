import { FetchProps } from "@customTypes/apiProps";

async function fetchGet(props: FetchProps) {
    const {
        url,
        method = "GET",
        isAuth,
        params = {},
        contentType = "json",
        cache = true,
        reavlidate = false,
        tags = [],
    } = props;

    const headers: Record<string, string> = {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": `http://localhost:3000`,
        "Access-Control-Allow-Methods": "GET",
    };

    if (isAuth) {
        const accessToken = getCookie("access-token");
        if (accessToken) {
            headers.Authorization = accessToken;
        }
    }

    const options: FetchOptionProps = {
        method,
        headers,
        credentials: isAuth ? "include" : "omit",
        cache: cache ? "force-cache" : "no-store",
        next: {
            revalidate,
            tags,
        },
    };

    try {
        const response = await fetch(
            `${ENDPOINT}${url}${queryString}`,
            options,
        );
        const fetchResult = await response.json();

        if (fetchResult && fetchResult.statusCode === 200) {
            return fetchResult;
        }
        return handleFetchError(fetchResult.statusCode || fetchResult.status);
    } catch (error) {
        throw error;
    }
}
