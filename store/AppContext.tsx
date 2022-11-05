import React from "react";
import useAxios, { SendRequest } from "../hooks/useAxios";
import LocationModel from "../models/LocationModel";

// Structure of the context model
export interface AppContextModel {
  location: LocationModel | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationModel | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  sendRequest: SendRequest;
  clearError: () => void;
}

// Instantiate the context
const AppContext = React.createContext<AppContextModel | null>(null);

// Context Provider component
export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // call the custom hook useAxios to get everything for fetching
  const { isLoading, setIsLoading, error, setError, sendRequest, clearError } =
    useAxios();

  const [location, setLocation] = React.useState<LocationModel | null>(null);

  return (
    <AppContext.Provider
      value={{
        location,
        setLocation,
        isLoading,
        setIsLoading,
        error,
        setError,
        sendRequest,
        clearError,
      }}
    >
      {children}{" "}
    </AppContext.Provider>
  );
};

export default AppContext;
