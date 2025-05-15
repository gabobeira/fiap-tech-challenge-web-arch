import { Divider, Paper, Typography } from "@mui/material";
import { ReactElement } from "react";

interface InvestmentStatProps {
  label?: string;
  value?: string;
  backgroundColor?: string;
  children?: ReactElement;
}

export const FInvestmentStat = ({
  label,
  value,
  backgroundColor,
  children,
}: InvestmentStatProps) => (
  <Paper
    sx={{
      padding: 2,
      backgroundColor,
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: "8px",
      flex: 1,
    }}
  >
    <Typography variant="caption">{label}</Typography>
    <Divider sx={{ width: 180, bgcolor: "#FF5031" }} />
    <Typography variant="h6">{value}</Typography>
    {children}
  </Paper>
);
