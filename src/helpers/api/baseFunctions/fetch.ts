/** Vendor */
import { useEffect, useState, useCallback } from "react";
import axios, { AxiosInstance } from "axios";

/** Local */
import { useAppDispatch } from "@/store/hooks.ts";
import { setIsLoading } from "@/store/slices/app.ts";

/** Type */
type BaseFetchType = {
  url: string;
  axiosInstance?: AxiosInstance;
  triggerRefetch?: boolean;
};

/** Hook */
const useBaseFetch = ({ url, axiosInstance = axios, triggerRefetch = false }: BaseFetchType) => {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [refetchData, setRefetch] = useState(false);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    dispatch(setIsLoading(true));

    try {
      const response = await axiosInstance.get(url);
      setData(response.data);
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [url, axiosInstance, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData, triggerRefetch, refetchData]);

  // Function to manually trigger a refetch
  const refetch = () => {
    setRefetch((prev) => !prev);
  };

  return { data, error, refetch };
};

export { useBaseFetch };
