import { TRANSACTION_TYPES } from "@/constants/transactionTypes";
import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";

interface SelectInputProps {
  formControlOptions?: FormControlProps;
  options?: SelectProps<string>;
  onChange?: (e: SelectChangeEvent) => void;
}

export function FSelectInput({
  formControlOptions,
  options,
  onChange,
}: SelectInputProps) {
  return (
    <FormControl
      fullWidth
      {...formControlOptions}
      style={{ width: "100%", margin: "auto", ...formControlOptions?.style }}
    >
      <InputLabel
        id="transaction-type-select-label"
        style={{ color: "var(--mui-palette-primary-main)" }}
      >
        Selecione o tipo de transação
      </InputLabel>
      <Select
        labelId="transaction-type-select-label"
        id="transaction-type-select"
        label="Selecione o tipo de transação"
        onChange={onChange}
        {...options}
        style={{
          minHeight: 40,
          borderRadius: 8,
          backgroundColor: "#FFFFFF",
          ...options?.style,
        }}
        sx={{
          color: "var(--mui-palette-primary-main)",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--mui-palette-primary-main)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline, &.Mui-focused:hover .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "var(--mui-palette-primary-main)",
              borderWidth: 2,
            },
          ".MuiSvgIcon-root": {
            color: "var(--mui-palette-primary-main)",
          },
          ...options?.sx,
        }}
      >
        {TRANSACTION_TYPES.map((type, index) => (
          <MenuItem value={type} key={`type-${index}`}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
