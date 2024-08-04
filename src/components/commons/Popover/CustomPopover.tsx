import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Popover, Typography, IconButton } from '@mui/material';

interface CustomPopoverProps {
    popoverTitle: string;
    popoverContent: string;
}

const CustomPopover: React.FC<CustomPopoverProps> = ({ popoverTitle, popoverContent }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'info-popover' : undefined;

    return (
        <>
            <IconButton
                aria-describedby={id}
                onClick={handleClick}
                size="small"
            >
                <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="hover:text-purple1"
                />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    '& .MuiPopover-paper': {
                        borderRadius: '8px',
                        width: '300px',
                    },
                }}
            >
                <Typography sx={{ p: 2, fontWeight: 'bold' }}>{popoverTitle}</Typography>
                <Typography sx={{ p: 2 }}>{popoverContent}</Typography>
            </Popover>
        </>
    );
};

export default CustomPopover;
