import { FInvestmentStat } from "@/components/atoms/FInvestmentStat/FInvestmentStat";
import { FCard } from "@/components/molecules/FCard/FCard";
import { FPieChart } from "@/components/molecules/FPieChart/FPieChart";
import styles from "@/components/organisms/FInvestmentsCard/FInvestmentsCard.styles";
import { AccountData } from "@/domain/types/AccountTypes";
import { formatCurrency } from "@/utils/formatters";
import { Box, Grid, Typography } from "@mui/material";

interface FInvestmentsCardProps {
  account: AccountData;
  children?: React.ReactNode[];
}

export function FInvestmentsCard({ account, children }: FInvestmentsCardProps) {
  const { investments, currency } = account;

  return (
    <FCard
      title="Investimentos"
      variant="light"
      options={{
        sx: {
          height: "auto",
          position: "relative",
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          ...styles.commonImage,
          ...styles.topPixelsImage,
          zIndex: -1,
        }}
      >
        {children && children[0]}
      </Box>

      <Box
        sx={{
          position: "absolute",
          ...styles.commonImage,
          ...styles.bottomPixelsImage,
          zIndex: -1,
        }}
      >
        {children && children[1]}
      </Box>

      <Box width={{ xs: "100%", sm: "100%" }}>
        <Box>
          <Typography variant="h6">
            Total: {formatCurrency(investments?.total || 0, currency)}
          </Typography>
          <Grid
            container
            spacing={2}
            columns={12}
            sx={{ marginTop: 4, marginBottom: 8 }}
          >
            <Grid
              size={{ xs: 12, sm: 4, md: 4 }}
              display="flex"
              flexDirection="column"
              gap={2}
              component="div"
            >
              <FInvestmentStat
                label="Renda Fixa"
                value={formatCurrency(investments?.fixed || 0, currency)}
                backgroundColor="#004D61"
              />
              <FInvestmentStat
                label="Renda Variável"
                value={formatCurrency(investments?.variable || 0, currency)}
                backgroundColor="#004D61"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 8, md: 8 }} component="div">
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  color: "#fff",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "24px",
                  borderRadius: "8px",
                  backgroundColor: "#004D61",
                  padding: "24px",
                }}
              >
                <Typography variant="h6">Estatísticas</Typography>
                <FPieChart />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </FCard>
  );
}
