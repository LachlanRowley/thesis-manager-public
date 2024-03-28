"use client";
import React from "react";
import "./SmallPopup.css";
//.NEXT
import Link from "next/link";
import Image from "next/image";
import ArrowIMG from "../img/arrow.png";
import { Button } from "@mui/material";

const SmallPopup = ({ onSelectFromList = () => {} }) => {
  return (
    <div className="popup">
      <Link href="/selfPropProject">
        <Button className="btn">
          <h1 className="txt">Self Propose</h1>
          <Image
            className="img"
            src={ArrowIMG}
            alt="Arrow"
            width={50}
            height={50}
          />
        </Button>
      </Link>
      <Button className="btn" onClick={onSelectFromList}>
        <h1 className="txt">Select From Project List</h1>
        <Image
          className="img"
          src={ArrowIMG}
          alt="Arrow"
          width={50}
          height={50}
        />
      </Button>
    </div>
  );
};

export default SmallPopup;
