export interface AlertState {
    severity: 'success' | 'error' | 'info' | 'warning' | undefined; 
    message: string;
    visible: boolean;
  }
  