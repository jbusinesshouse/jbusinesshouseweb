import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // State to store authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userVal, setUserVal] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const userLocalVal = JSON.parse(localStorage.getItem("user"))
            axios.post(`${process.env.REACT_APP_API_KEY}/auth/validate`, { phone: userLocalVal.phone, password: userLocalVal.password }).then(res => {
                console.log(res.data);
                setUserVal(res.data)
                setIsAuthenticated(true)
            }).catch(err => {
                console.log(err);
                setIsAuthenticated(false)
            })
        } else {
            setIsAuthenticated(false)
        }
    }, [])

    // Function to log in the user
    const login = () => {
        setIsAuthenticated(true);
    };

    // Function to log out the user
    const logout = () => {
        localStorage.removeItem("user")
        setIsAuthenticated(false);
    };

    // Value object containing authentication state and functions
    const value = {
        isAuthenticated,
        userVal,
        setUserVal,
        login,
        logout
    };

    // Provide the value to its children
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};