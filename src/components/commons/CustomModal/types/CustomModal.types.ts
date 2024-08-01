import React from "react";

export interface CustomModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    body: React.ReactNode;
    title: string;
    loading?: boolean;
}
