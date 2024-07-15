import React, { ReactNode, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import CustomSidebar from "../components/commons/CustomSidebar";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
    children?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const userAdmin = sessionStorage.getItem('userAdmin');

    useEffect(() => {
        if (!isLoggedIn && userAdmin !== 'true') {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, userAdmin, navigate]);

    if (!isLoggedIn && userAdmin !== 'true') {
        return null;
    }

    const handleDrawerToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex">
            <CustomSidebar open={sidebarOpen} handleDrawerToggle={handleDrawerToggle} />
            <div className="flex-grow p-2">
                <div className="bg-blue-600 text-white py-4 px-6 mb-2">
                    <h1 className="text-2xl font-bold">Tecito Store</h1>
                </div>
                {children}
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
