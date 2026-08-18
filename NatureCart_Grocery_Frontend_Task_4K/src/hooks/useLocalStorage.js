import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
          console.error(`Error writing to localStorage key "${key}":`, err);
        }
        return valueToStore;
      });
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
