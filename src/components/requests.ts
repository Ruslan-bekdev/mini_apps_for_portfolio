import {useState, useEffect} from "react";

export interface FetchResponse<T> {
    data: T | null;
    error: string | null;
    isLoading: boolean;
}

export const useFetch = <T>(url: string | null, options?: RequestInit): FetchResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!url) {
            setData(null);
            setError(null);
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal
                });
                const responseData = await response.json();

                response.ok
                    ?setData(responseData)
                    :setError(`Ошибка запроса на сервер! Код ошибки: ${response.status}`);
            } catch (error: any) {
                error.name === 'AbortError'
                    ?console.log('Fetch aborted')
                    :setError(`Произошла ошибка${': ' + error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url]);

    return {data, error, isLoading};
};
