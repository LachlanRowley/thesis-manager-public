import { Button } from "@mui/material";
import * as React from "react";
import styles from "./LinkButton.module.css";

export interface ILinkButtonProps {
  id: string;
  text: string;
}

export function LinkButton(props: ILinkButtonProps) {
  return (
    <Button className={styles.button} id={props.id}>
      {props.text}
    </Button>
  );
}
