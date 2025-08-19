import { useState, useEffect } from "react";

export function useDebounce<T>(value: T): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), 500);
    return () => clearTimeout(handler);
  }, [value]);

  return debounced;
}
