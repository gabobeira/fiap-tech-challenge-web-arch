import {
  FAccountSummary,
  FAccountSummaryProps,
} from "@/components/molecules/FAccountSummary/FAccountSummary";
import { FCard } from "@/components/molecules/FCard/FCard";
import { Box, Grid, Typography } from "@mui/material";
import styles from "./FAccountSummaryCard.styles";

export interface FAccountSummaryCardProps extends FAccountSummaryProps {
  firstName: string;
  date: string;
  children?: React.ReactNode[];
}

export function FAccountSummaryCard(props: FAccountSummaryCardProps) {
  const {
    balance,
    currency,
    firstName,
    date,
    isBalanceVisible,
    toggleBalanceVisibility,
  } = props;
  return (
    <FCard
      variant="dark"
      title={`Olá, ${firstName} :)`}
      options={{
        sx: {
          height: "600px",
          position: "relative",
        },
      }}
    >
      <Grid container spacing={4}>
        <Grid size={{ md: 6, xs: 12 }}>
          <Typography variant="caption" textTransform="capitalize">
            {date}
          </Typography>
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <FAccountSummary
            balance={balance}
            currency={currency}
            isBalanceVisible={isBalanceVisible}
            toggleBalanceVisibility={toggleBalanceVisibility}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          ...styles.commonImage,
          ...styles.bottomPixelsImage,
        }}
      >
        {props.children && props.children[0]}
      </Box>
      <Box
        sx={{
          ...styles.commonImage,
          ...styles.topPixelsImage,
        }}
      >
        {props.children && props.children[1]}
      </Box>
      <Box
        sx={{
          ...styles.commonImage,
          bottom: 0,
          left: { xs: 0, sm: 150 },
          width: "327px",
          height: "231px",
        }}
      >
        {props.children && props.children[2]}
      </Box>
    </FCard>
  );
}
