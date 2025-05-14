import { FInvestmentStat } from "@/components/atoms/FInvestmentStat/FInvestmentStat";
import { Grid } from "@mui/material";

export const FInvestmentStats = () => (
  <Grid container spacing={2} columns={12} sx={{ zIndex: 1 }}>
    <Grid size={{ xs: 12, sm: 6, md: 6 }} component="div">
      <FInvestmentStat
        label="Renda Fixa"
        value="R$ 36.000,00"
        backgroundColor="#3f51b5"
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: 6 }} component="div">
      <FInvestmentStat
        label="Renda Variável"
        value="R$ 14.000,00"
        backgroundColor="#e91e63"
      />
    </Grid>
  </Grid>
);
