"use client";
import React from "react";
import "./ConflictPopup.css";
//.NEXT
import Link from "next/link";
import Image from "next/image";
import ArrowIMG from "../img/arrow.png";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from "@mui/material";

const ConflictPopup = () => {
  return (
    <div className="popup">
      <h1 className="heading">CONFLICT DETAILS</h1>
      <h1 className="content">
        Please enter the unit code(s) of the unit(s) which have an exam that
        conflicts with this session
      </h1>

      <div className="txtin">
        <h1 className="unitcode">Unit Code</h1>
        <input className="txtinput" type="text" placeholder="Type here" />
      </div>

      <Link href="/selectFromList">
        <Button className="btn2">
          <h1 className="txt">Submit</h1>
          <Image
            className="img"
            src={ArrowIMG}
            alt="Arrow"
            width={50}
            height={50}
          />
        </Button>
      </Link>
    </div>
  );
};

export default ConflictPopup;
