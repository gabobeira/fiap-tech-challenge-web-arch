import { FCard } from "@/components/molecules/FCard/FCard";
import {
  FTransactionForm,
  FTransactionFormProps,
} from "@/components/molecules/FTransactionForm/FTransactionForm";
import { Box } from "@mui/material";
import styles from "./FTransactionFormCard.styles";

interface FTransactionFormCardProps extends FTransactionFormProps {
  children?: React.ReactNode[];
  showInvestment: boolean;
  showAll: boolean;
}

export function FTransactionFormCard({
  children,
  accountBalance,
  addTransaction,
  showInvestment = false,
  showAll = true,
}: FTransactionFormCardProps) {
  return (
    <FCard
      title="Nova transação"
      variant="light"
      options={{
        sx: {
          height: "600px",
          position: "relative",
        },
      }}
    >
      <Box
        sx={{
          ...styles.commonImage,
          ...styles.bottomPixelsImage,
        }}
      >
        {children && children[0]}
      </Box>
      <Box
        sx={{
          ...styles.commonImage,
          ...styles.topPixelsImage,
        }}
      >
        {children && children[1]}
      </Box>
      <Box
        sx={{
          ...styles.commonImage,
          bottom: 0,
          right: 0,
          width: "327px",
          height: "231px",
        }}
      >
        {children && children[2]}
      </Box>

      <Box width={{ xs: "100%", sm: "70%" }}>
        <FTransactionForm
          accountBalance={accountBalance}
          addTransaction={addTransaction}
          buttonText="Concluir transação"
          showInvestment={showInvestment}
          showAll={showAll}
        />
      </Box>
    </FCard>
  );
}
