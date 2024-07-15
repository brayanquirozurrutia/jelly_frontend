import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    loginContext: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const loggedIn = sessionStorage.getItem('isLoggedIn');
        return loggedIn ? JSON.parse(loggedIn) : false;
    });

    const loginContext = () => {
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', 'true');
    };

    const logout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('isLoggedIn');
    };

    useEffect(() => {
        if (!isLoggedIn) {
            sessionStorage.removeItem('isLoggedIn');
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, loginContext, logout }}>
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
