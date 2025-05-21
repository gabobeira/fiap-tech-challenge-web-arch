"use client";
import { FInvestmentsCard } from "@/components";

import { AccountData } from "@/domain/types/AccountTypes";
import { Grid } from "@mui/material";
import Image from "next/image";
import { image } from "../../../../../public/assets/image";

type InvestmentsContainerProps = {
  account: AccountData;
};

export default function InvestmentsContainer({
  account,
}: InvestmentsContainerProps) {
  return (
    <Grid
      size={{ xs: 12, lg: 10 }}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <FInvestmentsCard account={account}>
        <Image
          src={`${image}/card-pixels-3.svg`}
          alt=""
          layout="fill"
          loading="lazy"
        />
        <Image
          src={`${image}/card-pixels-4.svg`}
          alt=""
          layout="fill"
          loading="lazy"
        />
      </FInvestmentsCard>
    </Grid>
  );
}
