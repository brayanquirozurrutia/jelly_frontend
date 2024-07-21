import {useEffect, useState} from "react";

const usePhraseValidation = () => {
    const [phrase, setPhrase] = useState<string>('');
    const [phraseError, setPhraseError] = useState<string>('');

    useEffect(() => {
        if (phrase) {
            if (phrase.length < 10) {
                setPhraseError('La frase debe tener al menos 10 caracteres');
            } else {
                setPhraseError('');
            }
        }
    }, [phrase]);

    return {
        phrase,
        setPhrase,
        phraseError,
        setPhraseError
    }
}

export default usePhraseValidation;
