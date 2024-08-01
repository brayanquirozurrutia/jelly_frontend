import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton, Divider, Box } from '@mui/material';
import { ExpandLess, ExpandMore, ChevronLeft } from '@mui/icons-material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface SubMenuItem {
    text: string;
    icon?: React.ReactNode;
    url?: string;
}

interface MenuItem {
    text: string;
    icon?: React.ReactNode;
    subMenuItems?: SubMenuItem[];
    url?: string;
}

interface SidebarProps {
    open: boolean;
    handleDrawerToggle: () => void;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const CustomDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const CustomSidebar: React.FC<SidebarProps> = ({ open, handleDrawerToggle }) => {
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const items: MenuItem[] = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
        },
        {
            text: 'Categorías',
            icon: <GroupsIcon />,
            url: '/dashboard/categories'
        },
        {
            text: 'Grupos',
            icon: <Diversity1Icon />,
            url: '/dashboard/groups'
        },
        {
            text: 'Productos',
            icon: <AutoAwesomeMotionIcon />,
            subMenuItems: [
                {
                    text: 'Crear Producto',
                    url: '/dashboard/products/create',
                },
                {
                    text: 'Listar Productos',
                    url: '/dashboard/products/list',
                },
            ]
        },
        {
            text: 'Admin',
            icon: <AdminPanelSettingsIcon />,
            subMenuItems: [
                {
                    text: 'Frases',
                    url: '/dashboard/admin-app/phrases',
                },
            ]
        }
    ];

    const handleSubMenuToggle = (text: string) => {
        setOpenSubMenu(openSubMenu === text ? null : text);
    };

    const handleMenuItemClick = (index: number) => {
        setActiveIndex(index);
        const item = items[index];
        if (item.url) {
            navigate(item.url as string);
        }
    };

    const handleSubMenuItemClick = (url?: string) => {
        if (url) {
            navigate(url);
        }
    };

    const logoUrl = import.meta.env.VITE_LOGO as string;

    return (
        <Box sx={{ display: 'flex' }}>
            <CustomDrawer variant="permanent" open={open}>
                <DrawerHeader>
                    {open && (
                        <img
                            src={logoUrl}
                            alt="Logo Tecito Store"
                            style={{ margin: 'auto', display: 'block', maxWidth: '50%', maxHeight: '50%' }}
                        />
                    )}
                    <IconButton onClick={handleDrawerToggle}>
                        {!open && (
                            <img src={logoUrl} alt="Imagen"
                                 className="w-10"/>
                        )}
                        {open && (
                            <ChevronLeft />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {items.map((item, index) => (
                        <div key={index}>
                            <ListItem
                                onClick={() => {
                                    handleMenuItemClick(index);
                                    item.subMenuItems && handleSubMenuToggle(item.text);
                                }}
                                component="div"
                                className="hover:bg-slate-50"
                                style={{ cursor: 'pointer' }}
                            >
                                <ListItemIcon
                                    style={{
                                        cursor: 'pointer',
                                        color: activeIndex === index ? '#a57ee8' : 'black',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                                {item.subMenuItems ? (
                                    open ? (
                                        openSubMenu === item.text ? <ExpandLess /> : <ExpandMore />
                                    ) : null
                                ) : null}
                            </ListItem>
                            {item.subMenuItems && (
                                <Collapse in={open && openSubMenu === item.text} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.subMenuItems.map((subItem, subIndex) => (
                                            <ListItem
                                                key={subIndex}
                                                onClick={() => handleSubMenuItemClick(subItem.url)}
                                                component="div"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <ListItemIcon>{subItem.icon}</ListItemIcon>
                                                <ListItemText primary={subItem.text} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </div>
                    ))}
                </List>
            </CustomDrawer>
        </Box>
    );
};

export default CustomSidebar;
