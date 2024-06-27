import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertContext } from "../AlertContext";
import { AlertState } from "../../types/Alert";

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({
    severity: undefined,
    message: '',
    visible: false,
  });

  const showAlert = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning'
  ): void => {
    setAlert({
      message,
      severity,
      visible: true,
    });

    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}

      <Snackbar
        open={alert.visible}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, visible: false })}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};