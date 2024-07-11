"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import Layout from "./LayoutComponent";

function ThemeProviderComp({ children }) {
  return (
    <>
      <ThemeProvider attribute="class" enableColorScheme defaultTheme="dark">
        <Layout>{children}</Layout>
      </ThemeProvider>
    </>
  );
}

export default ThemeProviderComp;
