function getUrl(endpoint: string): string {
    return `${process.env.REACT_APP_API_URL}${endpoint}`;
}

export interface ListResponse<GenericType> {
    count: number;
    results: GenericType[];
}

export async function get<ResultType>(endpoint: string): Promise<ResultType> {
    const response = await fetch(getUrl(endpoint));
    const json = await response.json();

    if (response.status > 304) {
        throw new Error(json.message || response.body);
    }

    return json as ResultType;
}