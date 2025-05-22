"use client";
import { FInvestmentsCard } from "@/components";

import { useAccountStore } from "@/stores/AccountStore";
import { Grid } from "@mui/material";
import Image from "next/image";
import { image } from "../../../../../public/assets/image";

export default function InvestmentsContainer() {
  const { account } = useAccountStore();

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
