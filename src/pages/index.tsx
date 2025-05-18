import {
  FAccountButtonActions,
  FAccountButtons,
  FAdvantageColumn,
  FAdvantageContainer,
  FFooter,
  FHeader,
  FMenuDropdown,
  FMenuList,
  FMenuListItem,
} from "@/components";
import { dark } from "@/components/theme";
import { MENU_ITEMS_LANDING } from "@/constants/menuItems";
import ThemeProviderWrapper from "@/theme/ThemeProviderWrapper";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { image } from "../../public/assets/image";

export const getStaticProps: GetStaticProps = async () => {
  const menuItems = MENU_ITEMS_LANDING.map((item) => ({
    ...item,
    current: false,
  }));

  return {
    props: {
      menuItems,
    },
  };
};

interface LandingViewProps {
  menuItems: FMenuListItem[];
}

export default function LandingView({ menuItems }: LandingViewProps) {
  const router = useRouter();

  const actionsHome: FAccountButtonActions = {
    handleNewAccount: async () => {
      router.push("/dashboard");
    },
    handleLogin: async () => {
      router.push("/dashboard");
    },
  };

  return (
    <ThemeProviderWrapper mode={dark}>
      <Head>
        <title>Landing Page</title>
        <meta name="description" content="By FIAP Tech Challenge" />
      </Head>
      <FHeader
        maxWidth="lg"
        leftContent={
          <Box display="flex" alignItems="center" gap={8}>
            <Box
              sx={{
                display: { xs: "none", md: "none", lg: "flex" },
                userSelect: "none",
              }}
            >
              <Image
                src={`${image}/logo.svg`}
                alt="logo Bytebank"
                width={146}
                height={32}
                loading="lazy"
              />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex", lg: "none" },
                userSelect: "none",
              }}
            >
              <Image
                src={`${image}/logo-small.svg`}
                alt="logo Bytebank pequeno"
                width={27}
                height={27}
                loading="lazy"
              />
            </Box>
            <FMenuDropdown
              menuItems={menuItems}
              options={{ sx: { display: { xs: "flex", md: "none" } } }}
            >
              <Link href="" />
            </FMenuDropdown>
            <FMenuList
              menuItems={menuItems}
              variant="row"
              options={{
                sx: { display: { xs: "none", md: "flex" }, fontWeight: 600 },
              }}
            >
              <Link href="" />
            </FMenuList>
          </Box>
        }
        rightContent={
          <Box>
            <FAccountButtons
              color="primary"
              options={{
                sx: {
                  display: { xs: "none", md: "flex" },
                },
              }}
              handleNewAccount={() => {
                actionsHome.handleNewAccount();
              }}
              handleLogin={() => {
                actionsHome.handleLogin();
              }}
            />
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                userSelect: "none",
              }}
            >
              <Image
                src={`${image}/logo.svg`}
                alt="logo Bytebank"
                width={146}
                height={32}
                loading="lazy"
              />
            </Box>
          </Box>
        }
      />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: "100vw",
          minHeight: "100vh",
          background: "linear-gradient(var(--mui-palette-tertiary-main), #fff)",
        }}
      >
        <Container maxWidth="lg" sx={{ flex: 1 }}>
          <Box paddingTop={3} paddingBottom={3} gap={8}>
            <Grid
              container
              display="flex"
              alignItems="center"
              justifyContent="center"
              spacing={8}
            >
              <Grid
                size={{ md: 12, lg: 5 }}
                display="flex"
                justifyContent={{ xs: "center", lg: "flex-start" }}
              >
                <Typography
                  variant="h1"
                  fontWeight={600}
                  color="#000"
                  maxWidth={446}
                  textAlign={{ xs: "center", lg: "left" }}
                >
                  Experimente mais liberdade no controle da sua vida financeira.
                  Crie sua conta com a gente!
                </Typography>
              </Grid>
              <Grid
                size={{ md: 12, lg: 7 }}
                display="flex"
                justifyContent={{ xs: "center", lg: "flex-end" }}
              >
                <Image
                  src={`${image}/banner-illustration.svg`}
                  alt=""
                  layout="responsive"
                  width={662}
                  height={413}
                  loading="lazy"
                />
              </Grid>
            </Grid>
            <FAccountButtons
              color="secondary"
              options={{
                display: { xs: "flex", md: "none" },
                marginTop: 4,
                marginBottom: 4,
              }}
              handleNewAccount={() => {
                actionsHome.handleNewAccount();
              }}
              handleLogin={() => {
                actionsHome.handleLogin();
              }}
            />
            <FAdvantageContainer>
              <FAdvantageColumn
                title="Conta e cartão gratuitos"
                description="Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção."
              >
                <Image
                  src={`${image}/GiftBox.svg`}
                  alt="Ícone de caixa de presente"
                  width="64"
                  height="64"
                  loading="lazy"
                />{" "}
              </FAdvantageColumn>
              <FAdvantageColumn
                title="Saques sem custo"
                description="Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h."
              >
                <Image
                  src={`${image}/Exchange.svg`}
                  alt="Ícone de mão entregando dinheiro"
                  width="64"
                  height="64"
                  loading="lazy"
                />{" "}
              </FAdvantageColumn>
              <FAdvantageColumn
                title="Programa de pontos"
                description="Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!"
              >
                <Image
                  src={`${image}/Star.svg`}
                  alt="Ícone de estrela"
                  width="64"
                  height="64"
                  loading="lazy"
                />{" "}
              </FAdvantageColumn>
              <FAdvantageColumn
                title="Seguro dispositivos"
                description="Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica."
              >
                <Image
                  src={`${image}/Devices.svg`}
                  alt="Ícone de diversas telas de diferentes dispositivos"
                  width="64"
                  height="64"
                  loading="lazy"
                />{" "}
              </FAdvantageColumn>
            </FAdvantageContainer>
          </Box>
        </Container>

        <FFooter>
          <Image
            src={`${image}/logo-white.svg`}
            alt=""
            width={145}
            height={32}
            loading="lazy"
          />
        </FFooter>
      </main>
    </ThemeProviderWrapper>
  );
}
