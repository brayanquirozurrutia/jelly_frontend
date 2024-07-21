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
    value: string;
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

export interface BannerPhrase {
    id: string;
    phrase: string;
}

export interface BannerPhrasesData {
    bannerPhrases: BannerPhrase[];
}
