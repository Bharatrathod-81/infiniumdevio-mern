import React, { createContext, useContext, useState } from "react";

const dataContext = createContext();

const DataContextProvider = ({ children }) => {

    const [employList, setEmployList] = useState([])
   
    return(
        <dataContext.Provider value={{employList, setEmployList}}>
            { children }
        </dataContext.Provider>
    )
};

const useEmployeeData = () => useContext(dataContext);

export {useEmployeeData, DataContextProvider}