import { useState } from "react";
import { useEffect } from "react";

function useLocalStorage(key, initialValue) {

    const calculateDefaultValue = () => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    }

    const [value, setValue] = useState(calculateDefaultValue);

    const updateValue = async (newValue) => {
        setValue(newValue);
        await localStorage.setItem(key, JSON.stringify(newValue));
      };

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])


    return  [value, updateValue];
}


export default useLocalStorage;