import React, { useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const getLocalStorage = (name) => {
        return JSON.parse(localStorage.getItem(name));
    };

    const setLocalStorage = (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
    };

    const removeLocalStorage = (name) => {
        localStorage.removeItem(name);
    };

    const useOutsideAlerter = (ref, callback) => {
        useEffect(() => {
            function handleClickOutside(event) {
                // Clicked outside
                if (ref.current && !ref.current.contains(event.target)) {
                    callback();
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    };

    return (
        <AppContext.Provider
            value={{
                getLocalStorage,
                setLocalStorage,
                useOutsideAlerter,
                removeLocalStorage,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
