import {
  FTransactionAction,
  FTransactionActionProps,
} from "@/components/molecules/FTransactionAction/FTransactionAction";
import { Grid, Typography } from "@mui/material";
import styles from "./FTransactionItem.styles";

export interface TransactionItem {
  id: string;
  type: string;
  formattedDate: string;
  formattedValue: string;
  fileName?: string;
}

export interface FTransactionItemProps
  extends Omit<TransactionItem, "id">,
    FTransactionActionProps {}

export function FTransactionItem({
  type,
  formattedDate,
  formattedValue,
  fileName,
  onEdit,
  onDelete,
}: FTransactionItemProps) {
  return (
    <Grid container>
      <Grid size={10} gap={8} sx={styles.gridLeft}>
        <Typography variant="caption" fontWeight={600} color="tertiary">
          {formattedDate}
        </Typography>
        <Typography variant="body1">{type}</Typography>
        <Typography variant="body1" fontWeight={600}>
          {formattedValue}
        </Typography>
        <Typography variant="body1">{fileName}</Typography>
      </Grid>
      <Grid size={2} display="flex" alignItems="center" justifyContent="center">
        <FTransactionAction
          onEdit={onEdit}
          onDelete={onDelete}
        ></FTransactionAction>
      </Grid>
    </Grid>
  );
}
