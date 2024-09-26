export interface FetchProps {
    url: string;
    method: "GET" | "POST" | "PUT";
    params?: Record<string, string>;
    data?: unknown;
    isAuth: boolean;
    contentType?: "json";
    cache?: boolean;
    revalidate?: false | number;
    tags?: string[];
}
