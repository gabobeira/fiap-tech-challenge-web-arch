import { FIconButton } from "@/components/atoms/FIconButton/FIconButton";
import { VisibilityOffTwoTone, VisibilityTwoTone } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";

export interface FAccountSummaryProps {
  balance: string;
  currency: string;
  isBalanceVisible: boolean;
  toggleBalanceVisibility: () => void;
}

export function FAccountSummary(props: FAccountSummaryProps) {
  const { balance, currency, isBalanceVisible, toggleBalanceVisibility } =
    props;

  return (
    <Stack spacing={1.875}>
      <Stack direction={"row"} gap={3}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="var(--mui-palette-secondary-contrastText)"
        >
          Saldo
        </Typography>
        <FIconButton
          onClick={toggleBalanceVisibility}
          options={{ color: "secondary" }}
        >
          {props.isBalanceVisible ? (
            <VisibilityTwoTone />
          ) : (
            <VisibilityOffTwoTone />
          )}
        </FIconButton>
      </Stack>
      <Divider sx={{ width: 180, bgcolor: "#FF5031" }} />
      <Typography
        variant="body1"
        fontWeight={400}
        color="var(--mui-palette-secondary-contrastText)"
      >
        Conta Corrente
      </Typography>
      <Typography
        fontWeight={400}
        fontSize={31}
        color="var(--mui-palette-secondary-contrastText)"
      >
        {isBalanceVisible ? balance : `${currency} *****`}
      </Typography>
    </Stack>
  );
}
