import { createContext } from "react";

export const AlertContext = createContext<(message: string, severity: 'success' | 'error' | 'info' | 'warning') => void>(() => {});

