import { TextField, InputAdornment } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import React from "react";

interface UsernameTextFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const UsernameTextField: React.FC<UsernameTextFieldProps> = ({
  value,
  onChange,
  label = "username...",
}) => {
  return (
    <TextField
      id="input-with-icon-textfield"
      label={label}
      variant="standard"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle sx={{ color: "#00ffcc", fontSize: 32 }} />
          </InputAdornment>
        ),
        sx: {
          fontSize: 20,
          fontFamily: "'Inter', sans-serif",
        },
      }}
      InputLabelProps={{
        sx: {
          color: "#00ffcc",
          fontSize: 18,
          "&.Mui-focused": {
            color: "#00ffcc",
          },
        },
      }}
      sx={{
        width: "100%",
        input: {
          color: "#00ffcc",
          fontSize: 20,
          paddingY: 1.5,
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: "#00ffcc",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#00ffcc",
        },
      }}
    />
  );
};

export default UsernameTextField;
