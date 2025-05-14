"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { light } from "@/components/theme";
import { Theme } from "@emotion/react";

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
  mode?: Theme;
}

const ThemeProviderWrapper = ({ children, mode = light }: ThemeProviderWrapperProps) => {
  return (
    <ThemeProvider theme={mode}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
