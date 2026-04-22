import { useState } from "react";
import { HttpMethod } from "@/app/enums/http-method";

interface UseApiFetchOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

interface ApiCallOptions {
  method?: HttpMethod;
  body?: FormData | Record<string, unknown>;
  headers?: Record<string, string>;
}

export function useApiFetch<T = unknown>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApi = async (
    route: string,
    options: ApiCallOptions = {},
    fetchOptions?: UseApiFetchOptions<T>
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const { method = HttpMethod.POST, body, headers } = options;

      const requestInit: RequestInit = {
        method,
        headers: {
          ...(body instanceof FormData
            ? {}
            : { "Content-Type": "application/json" }),
          ...headers,
        },
        ...(body ? { body: body instanceof FormData ? body : JSON.stringify(body) } : {}),
      };

      const response = await fetch(route, requestInit);
      const json = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof json === "object" && "error" in json
            ? (json as { error: string }).error
            : `Request failed (${response.status})`;
        throw new Error(errorMessage);
      }

      fetchOptions?.onSuccess?.(json as T);
      return json as T;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
      setError(errorMessage);
      fetchOptions?.onError?.(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchApi, isLoading, error };
}
