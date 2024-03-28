"use client";

import Button from "@mui/material/Button";
import React from "react";
import styles from "./ArrowButton.module.css";
import Arrow from "../img/arrow.png";
import Image from "next/image";

interface Props {
  text: string;
  onClick: () => void;
}

function ArrowButton(props: Props) {
  return (
    <Button className={styles.ArrowButton} onClick={props.onClick}>
      <h1 className={styles.Text}>{props.text}</h1>
      <Image src={Arrow} alt="Arrow" width={50} height={50} />
    </Button>
  );
}

export default ArrowButton;
