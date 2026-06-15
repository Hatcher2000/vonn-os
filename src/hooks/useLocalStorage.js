import { useState, useEffect } from 'react';
export function useLocalStorage(key, initialValue) {
    // Read value from local storage or use initialValue if empty
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.error("Local storage read error for key:", key, error);
            return initialValue;
        }
    });
    // Whenever storedValue changes, update local storage state safely
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        }
        catch (error) {
            console.error("Local storage save error for key:", key, error);
        }
    }, [key, storedValue]);
    return [storedValue, setStoredValue];
}
//# sourceMappingURL=useLocalStorage.js.map