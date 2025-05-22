"use client";
import { FAccountSummaryCard } from "@/components";

import { useAccountStore } from "@/stores/AccountStore";
import { formatCurrency, getFormattedDateNow } from "@/utils/formatters";
import { Grid } from "@mui/material";
import Image from "next/image";
import { image } from "../../../../../public/assets/image";

export default function AccountSummaryContainer({}) {
  const { account, isBalanceVisible, toggleBalanceVisibility } =
    useAccountStore();

  const formattedBalance = formatCurrency(account.balance, account.currency);
  const formattedDate = getFormattedDateNow();

  return (
    <Grid
      size={{ xs: 12, lg: 10 }}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <FAccountSummaryCard
        firstName={account.firstName}
        currency={account.currency}
        balance={formattedBalance}
        date={formattedDate}
        isBalanceVisible={isBalanceVisible}
        toggleBalanceVisibility={toggleBalanceVisibility}
      >
        <Image src={`${image}/card-pixels-2.svg`} alt="" fill loading="lazy" />
        <Image src={`${image}/card-pixels-1.svg`} alt="" fill loading="lazy" />
        <Image
          src={`${image}/card-illustration-1.svg`}
          alt=""
          fill
          loading="lazy"
        />
      </FAccountSummaryCard>
    </Grid>
  );
}
