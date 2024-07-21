import React, { useState } from 'react';
import { Typography, IconButton, Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CollapsibleHeaderProps {
    label: string;
    initialOpen?: boolean;
    children?: React.ReactNode;
    onToggle?: () => void;
}

const CustomCollapse: React.FC<CollapsibleHeaderProps> = ({
                                                                 label,
                                                                 initialOpen = false,
                                                                 children,
                                                              onToggle
                                                             }) => {
    const [collapseOpen, setCollapseOpen] = useState(initialOpen);

    const handleToggle = () => {
        setCollapseOpen(!collapseOpen);
        if (onToggle) onToggle();
    };

    return (
        <div>
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={handleToggle}
            >
                <Typography variant="h5" component="h2" className="font-bold p-2">
                    {label}
                </Typography>
                <IconButton
                    aria-label="expand form"
                    className="mx-2 text-black"
                    sx={{
                        '&:hover': { backgroundColor: '#a57ee8' }
                    }}
                >
                    {collapseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </div>
            <Collapse
                in={collapseOpen}
                timeout="auto"
                unmountOnExit
            >
                <div className="mt-2">
                    {children}
                </div>
            </Collapse>
        </div>
    );
};

export default CustomCollapse;
