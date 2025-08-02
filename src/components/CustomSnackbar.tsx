// src/components/CustomSnackbar.tsx
import React from "react";
import { Snackbar, Alert, type AlertColor } from "@mui/material";

interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor;
  duration?: number;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  onClose,
  message,
  severity = "error",
  duration = 6000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
