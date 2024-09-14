import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

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
    
    return (
        <UserContext.Provider value={{ isLogged, user, setUser, setIsLogged }}>
        {children}
        </UserContext.Provider>
    );
}
