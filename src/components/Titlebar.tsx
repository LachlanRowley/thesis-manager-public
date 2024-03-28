"use client";

import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import styles from "./Titlebar.module.css";

interface Props {
  titleText: string;
}

export default function Titlebar({ titleText }: Props) {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#a6192e",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#d6d2c4",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "primary.main", color: "#FFFFFF" }}>
        <div id={styles.Ribbon_container}>
          <h1>{titleText}</h1>
        </div>
      </Box>
    </ThemeProvider>
  );
}
