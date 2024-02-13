import {useState, useEffect} from "react";

export interface ObjectWithUnknownValue {
    [key: string]: unknown;
}
export interface FetchResponse<T> {
    data: T | null;
    error: string;
    isLoading: boolean;
}

export const useFetch = <T>(url: string, options?: ObjectWithUnknownValue): FetchResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                const responseData = await response.json();

                response.ok
                    ?setData(responseData)
                    :setError(`Ошибка запроса на сервер! Код ошибки: ${response.status}`);
            } catch (error: any) {
                setError(`Произошла ошибка${': ' + error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return {data, error, isLoading};
};
