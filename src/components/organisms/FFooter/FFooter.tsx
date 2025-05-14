import { FFooterIconsColumn } from "@/components/molecules/FFooterIconsColumn/FFooterIconsColumn";
import { FFooterTextColumn } from "@/components/molecules/FFooterTextColumn/FFooterTextColumn";
import { Box, Container, Grid } from "@mui/material";

import { listContact, listService } from "./FFooter.constants";

interface FFooterProps {
  children?: React.ReactNode;
}

export function FFooter({ children }: FFooterProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        width: "100%",
      }}
      padding={6}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FFooterTextColumn textHeader="Serviços" listItems={listService} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FFooterTextColumn textHeader="Contato" listItems={listContact} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FFooterIconsColumn textHeader="Desenvolvido por Alura">
              {children}
            </FFooterIconsColumn>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
