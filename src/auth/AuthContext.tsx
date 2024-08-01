import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    userAdmin: boolean;
    loginContext: (admin: boolean) => void;
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

    const [userAdmin, setUserAdmin] = useState(() => {
        const admin = sessionStorage.getItem('userAdmin');
        return admin ? JSON.parse(admin) : false;
    });

    const loginContext = (admin: boolean) => {
        setIsLoggedIn(true);
        setUserAdmin(admin);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userAdmin', JSON.stringify(admin));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserAdmin(false);
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userAdmin');
    };

    useEffect(() => {
        if (!isLoggedIn) {
            sessionStorage.removeItem('isLoggedIn');
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userAdmin, loginContext, logout }}>
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
