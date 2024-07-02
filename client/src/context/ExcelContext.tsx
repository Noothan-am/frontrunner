import React, { createContext, useContext, useEffect, useState } from "react";
export const AllUsersData = createContext({});

export const ExcelContextProvider = ({ children }: any) => {
  const [allExcelUsersData, setAllExcelUsersData] = useState<any>();

  return (
    <AllUsersData.Provider value={{ allExcelUsersData, setAllExcelUsersData }}>
      {children}
    </AllUsersData.Provider>
  );
};

export const useExcelData = () => {
  const context = useContext(AllUsersData);
  if (context === undefined) {
    throw new Error("Auth context must be used within a AuthProvider");
  }
  return context;
};
