import { TextField, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import styles from "./TextInput.module.css";

export interface ITextInputProps {
  id: string;
  label: string;
  multiline: boolean;
  rows: number;
}

export function TextInput(props: ITextInputProps) {
  return (
    <TextField
      className={styles.input}
      id={props.id}
      label={props.label}
      multiline={props.multiline}
      rows={props.rows}
      variant="filled"
      fullWidth
    />
  );
}
