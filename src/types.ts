import React from "react";
import {SvgIconProps} from "@mui/material";

export interface ObjectType {
    id: string;
    name: string;
    description: string;
}

export interface TokenResponse {
    message: string;
}

export interface UseTimerProps {
    initialTime: number;
    onExpire: () => void;
}

export interface NewTokenProps {
    endpoint: (data: { email: string }) => Promise<TokenResponse>;
    openCollapseMessage: string;
    labelMessage: string;
}

export interface InputProps {
    value: string | number;
    setValue: (value: string) => void;
    valueError: string;
    setFocusedInput: (value: string | null) => void;
    focusedInput: string | null;
    id: string;
    label: string;
    placeholder: string;
    icon: React.ElementType<SvgIconProps>;
    focusText: string;
    type?: string;
    maxLength?: number;
    required?: boolean;
}

export interface CountDownProps {
    initialCountdown: number,
    onCountdownEnd: () => void,
}

// GenericObject to use in CRUD Table
export interface GenericObject {
    [key: string]: unknown;
}

// Interface to create a new object
export interface CreateNewObjectProps {
    onCreated: () => void;
}

// Interface to view a new object
export interface ViewNewObjectProp<T> {
    onEdit: (object: T) => void;
    onDelete: (object: T) => void;
    refreshTable: boolean;
}

// Interface to edit a new object
export interface EditNewObjectProp<T> {
    open: boolean;
    onClose: () => void;
    object: T | null;
    onUpdated: () => void;
}
