import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    userAdmin: boolean;
    login: () => void;
    logout: () => void;
    authenticateUser: () => void;
    authenticateAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        return loggedIn ? JSON.parse(loggedIn) : false;
    });

    const [userAdmin, setUserAdmin] = useState(() => {
        const admin = localStorage.getItem('userAdmin');
        return admin ? JSON.parse(admin) : false;
    });

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        setUserAdmin(false);
        localStorage.removeItem('userAdmin');
    };

    const authenticateUser = () => {
        login();
    };

    const authenticateAdmin = () => {
        login();
        setUserAdmin(true);
        localStorage.setItem('userAdmin', 'true');
    };

    useEffect(() => {
        if (!isLoggedIn) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userAdmin');
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userAdmin, login, logout, authenticateUser, authenticateAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
