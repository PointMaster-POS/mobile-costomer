import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

// ----------------- User Context -----------------
export const UserContext = createContext();


// ----------------- User Context Provider -----------------
export const UserContextProvider = ({ children }) => {

    // ----------------- User Context States -----------------
    //states to identify user is available or not
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    
    //check if user is logged in or not 
    useEffect(() => {
        const user = AsyncStorage.getItem("user");
        if (user) {
        setUser(user);
        }
        else {
        setUser(null);
        }
    }, [isLogged]);
    
    //----------------- Return User Context -----------------
    return (
        <UserContext.Provider value={{ isLogged, user, setUser, setIsLogged }}>
        {children}
        </UserContext.Provider>
    );
}
