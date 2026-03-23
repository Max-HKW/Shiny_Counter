/**
 * Node modules
 */
import { useState, useEffect, useCallback } from "react";

/**
 * Constants
 */
const STORAGE_KEY = "shiny_counter_value";

/**
 * Helpers
 */
const loadFromStorage = (): number => {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    if (storedValue == null) return 0;
    const parsedValue = parseInt(storedValue, 10);
    return isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue;
  } catch {
    return 0;
  }
};

const saveToStorage = (value: number): void => {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    console.warn("localStorage not available — counter will not persist.");
  }
};

/**
 * Types
 */
interface UseCounterReturn {
  counterValue: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounter = (): UseCounterReturn => {
  const [counterValue, setCounterValue] = useState(loadFromStorage);

  useEffect(() => {
    saveToStorage(counterValue);
  }, [counterValue]);

  const increment = useCallback(() => {
    setCounterValue((prevValue) => prevValue + 1);
  }, []);

  const decrement = useCallback(() => {
    setCounterValue((prevValue) => Math.max(0, prevValue - 1));
  }, []);

  const reset = useCallback(() => {
    setCounterValue(0);
  }, []);

  return { counterValue, increment, decrement, reset };
};

export default useCounter;
