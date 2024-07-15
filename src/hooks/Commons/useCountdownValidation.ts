import { useState, useEffect, useCallback } from "react";

const useCountdownValidation = (
    initialCountdown: number,
    onCountdownEnd: () => void,
    setEndpointSuccess: (message: string | ((prev: string) => string)) => void
) => {
    const [countdown, setCountdown] = useState<number>(initialCountdown);
    const [isActive, setIsActive] = useState<boolean>(false);

    const startCountdown = useCallback(() => {
        if (!isActive) {
            setCountdown(initialCountdown);
            setIsActive(true);
        }
    }, [initialCountdown, isActive]);

    useEffect(() => {
        if (isActive && countdown > 0) {
            const countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            return () => clearInterval(countdownInterval);
        } else if (countdown === 0 && isActive) {
            onCountdownEnd();
            setIsActive(false);
        }
    }, [countdown, isActive, onCountdownEnd]);

    useEffect(() => {
        if (countdown > 0 && isActive) {
            setEndpointSuccess((prev: string) =>
                prev.includes("Redirigiendo en")
                    ? prev.replace(/\d+/, countdown.toString())
                    : `${prev}. Redirigiendo en ${countdown} segundos`
            );
        }
    }, [countdown, isActive, setEndpointSuccess]);

    return {
        countdown,
        startCountdown,
    };
};

export default useCountdownValidation;
