import { Box, TextField, TextFieldProps } from "@mui/material";

interface InputProps {
  options?: TextFieldProps;
  textposition: "left" | "center";
  maxWidth?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FInput({
  options,
  textposition,
  maxWidth,
  onChange,
}: InputProps) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          width: "100%",
          margin: "auto",
          maxWidth: maxWidth,
        },
      }}
      noValidate
    >
      <TextField
        {...options}
        variant="outlined"
        slotProps={{
          inputLabel: {
            sx: {
              color: "var(--mui-palette-primary-main)",
            },
          },
          input: {
            sx: {
              textAlign: textposition,
              borderRadius: "8px",
              borderWidth: 2,
              color: "var(--mui-palette-primary-constrastText)",
              borderColor: "var(--mui-palette-primary-main)",
              boxShadow: "none",
              "::placeholder": {
                color: "var(--mui-palette-primary-main)",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--mui-palette-primary-main)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline, &.Mui-focused:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "var(--mui-palette-primary-main)",
                  borderWidth: 2.5,
                },
              "& .MuiOutlinedInput-input:-webkit-autofill": {
                WebkitBoxShadow:
                  "0 0 0 100px var(--mui-palette-primary-light) inset",
                WebkitTextFillColor: "var(--mui-palette-primary-dark)",
              },
            },
          },
        }}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      />
    </Box>
  );
}
