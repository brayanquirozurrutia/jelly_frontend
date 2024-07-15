import { useState, useEffect } from 'react';
import useButtonDisabledValidation from "./useButtonDisabledValidation.ts";
import { UseTimerProps } from "../../types.ts";

const useTimerValidation = ({ initialTime, onExpire }: UseTimerProps) => {
    const [timer, setTimer] = useState<number | null>(null);

    const {
        isButtonDisabled,
        setIsButtonDisabled,
    } = useButtonDisabledValidation();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer !== null && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => (prevTimer !== null ? prevTimer - 1 : null));
            }, 1000);
        } else if (timer === 0) {
            setIsButtonDisabled(false);
            setTimer(null);
            onExpire();
        }
        return () => clearInterval(interval);
    }, [timer, onExpire, setIsButtonDisabled]);

    const startTimer = () => {
        setTimer(initialTime);
        setIsButtonDisabled(true);
    };

    return {
        timer,
        isButtonDisabled,
        startTimer,
    };
};

export default useTimerValidation;
