/** Vendor */
import { useEffect, useState, useCallback, useMemo } from "react";
import axios, { AxiosInstance } from "axios";

/** Local */
import { useAppDispatch } from "@/store/hooks.ts";
import { setIsLoading } from "@/store/slices/app.ts";

/** Type */
type BaseApiRequestType = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  axiosInstance?: AxiosInstance;
  requestHeaders?: Record<string, string>;
  requestBody?: Record<string, string | number>;
  retryRequest?: boolean;
  showLoading?: boolean;
  enableInmediateRequest?: boolean;
};

/**
 * Base API request hook with Axios.
 *
 * @example
 * const { data, error, retry } = useBaseApiRequest({
 *   url: `/some-endpoint`,
 *   axiosInstance: tmdbAPI,
 *   method: "get",
 * });
 *
 * @param url - URL or API endpoint.
 * @param method - HTTP method.
 * @param axiosInstance - Axios instance.
 * @param requestHeaders - Request headers. Should be memoized object to prevent infinite loop.
 * @param requestBody - Request body. Should be memoized object to prevent infinite loop.
 * @param retryRequest - Boolean to retry request.
 * @param showLoading - Boolean to show loading spinner.
 * @param enableInmediateRequest - Boolean to enable inmediate API request.
 */

/** Hook */
const useBaseApiRequest = ({
  url,
  method = "get",
  axiosInstance = axios,
  requestHeaders,
  requestBody,
  retryRequest = false,
  showLoading = true,
  enableInmediateRequest = true,
}: BaseApiRequestType) => {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [manuallyRetry, setManuallyRetry] = useState(false);
  const dispatch = useAppDispatch();

  // Prevent infinte loop for objects passed as props.
  // Setting default value in props will cause infinite loop -> Creates new object with new reference -> useEffect will run again.
  // With useMemo only creates new object when dependency changes -> Remains stable across renders.
  const memoizedRequestHeaders = useMemo(() => requestHeaders || {}, [requestHeaders]);
  const memoizedRequestBody = useMemo(() => requestBody || null, [requestBody]);

  // API request
  const makeRequest = useCallback(async () => {
    if (showLoading) dispatch(setIsLoading(true));

    try {
      const response = await axiosInstance({
        method,
        url,
        headers: memoizedRequestHeaders,
        data: memoizedRequestBody,
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
    } finally {
      if (showLoading) dispatch(setIsLoading(false));
    }
  }, [url, method, axiosInstance, dispatch, showLoading, memoizedRequestHeaders, memoizedRequestBody]);

  // Watch for manual retry
  useEffect(() => {
    if (enableInmediateRequest || retryRequest) makeRequest();
  }, [makeRequest, retryRequest, manuallyRetry, enableInmediateRequest]);

  // Function to manually trigger another request
  const retry = () => {
    setManuallyRetry((prev) => !prev);
  };

  return { data, error, retry };
};

export { useBaseApiRequest };
