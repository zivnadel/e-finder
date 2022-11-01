import React from "react";
import axios from "axios";

// Send request function type
export type SendRequest = {
  <DataType>(url: string, method?: string, data?: any, headers?: any): Promise<
    DataType | undefined
  >;
};

// Custom hook to use the axios package
// including abort controller and a built in
// error and loading state manager
const useAxios = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // ref to store the active requests
  const activeRequest = React.useRef<AbortController[]>([]);

  // the function to invoke the axios API
  const sendRequest = React.useCallback(
    async <DataType>(
      url: string,
      method?: string,
      data?: any,
      headers?: any
    ) => {
      setIsLoading(true);
      const abortController = new AbortController();

      // add to abort controller
      activeRequest.current.push(abortController);

      // fetch
      try {
        const response = await axios.request<DataType>({
          url,
          method: method || "GET",
          data,
          headers,
          signal: abortController.signal,
        });

        // remove from abort controller after finished
        activeRequest.current = activeRequest.current.filter(
          (reqCtrl) => reqCtrl !== abortController
        );

        return response.data;
      } catch (err: any) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError(err.message || "An error occured");
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = React.useCallback(() => {
    setError("");
  }, []);

  // abort everything on the end of the component life
  React.useEffect(() => {
    return () => {
      activeRequest.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { isLoading, setIsLoading, error, setError, sendRequest, clearError };
};

export default useAxios;
