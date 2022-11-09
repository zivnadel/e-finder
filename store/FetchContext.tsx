import React from "react";

import useAxios, { SendRequest } from "../hooks/useAxios";

interface FetchContextModel {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  sendRequest: SendRequest;
  clearError: () => void;
}

// This react context is used to provide all the functionality
// relevant to fetching (providing the useAxios hook)

const FetchContext = React.createContext<FetchContextModel | null>(null);

export const FetchContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoading, setIsLoading, error, setError, sendRequest, clearError } =
    useAxios();

  return (
    <FetchContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        sendRequest,
        clearError,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export default FetchContext;
