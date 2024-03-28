"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

//Adding login check
import { getCurrentUser } from "../frontendUtils/getCurrentUser";

export default function Navbar() {
  const routePathName = usePathname();
  const isActive: (pathname: string) => boolean = (pathname) =>
    routePathName === pathname;

  //Get auth details
  const [userLoginStatus, setUserLoginStatus] = useState("");
  const [isProgLead, setProgLead] = useState("");
  const [showAcOrPL, setAcOrPL] = useState("");
  useEffect(() => {
    getCurrentUser()
      .then((result) => {
        //Find and set user_type_id
        console.log("State = " + isProgLead.toString());
        setUserLoginStatus(result.user_type_id);
        useRef(setProgLead(result.program_lead));
        console.log(result.user_type_id);
        console.log("Is Program Lead: " + result.program_lead.toString());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //List of navbar elements
  const navbarElements = [
    <div key={0} className={styles.headerLink}>
      <Link href={"/stuAllProjects"} legacyBehavior>
        <a data-active={isActive("/stuAllProjects")}>ALL PROJECTS</a>
      </Link>
    </div>,

    <div key={1} className={styles.headerLink}>
      <Link href={"/projectSelection"} legacyBehavior>
        <a data-active={isActive("/projectSelection")}>PROJECT SELECTION</a>
      </Link>
    </div>,

    <div key={2} className={styles.headerLink}>
      <Link href={"/studentPresSched"} legacyBehavior>
        <a data-active={isActive("/studentPresSched")}>PRESENTATION SCHEDULE</a>
      </Link>
    </div>,

    <div key={3} className={styles.headerLink}>
      <Link href={"/acdViewProjects"} legacyBehavior>
        <a data-active={isActive("/acdViewProjects")}>MY PROJECTS</a>
      </Link>
    </div>,

    <div key={4} className={styles.headerLink}>
      <Link href={"/"} legacyBehavior>
        <a data-active={isActive("/")}>MY STUDENTS</a>
      </Link>
    </div>,

    <div key={5} className={styles.headerLink}>
      <Link href={"/acdPresMarking"} legacyBehavior>
        <a data-active={isActive("/acdPresMarking")}>PRESENTATION MARKING</a>
      </Link>
    </div>,

    <div key={6} className={styles.headerLink}>
      <Link href={"/acdReportMarking"} legacyBehavior>
        <a data-active={isActive("/acdReportMarking")}>REPORT MARKING</a>
      </Link>
    </div>,

    <div key={7} className={styles.headerLink}>
      <Link href={"/stuAllProjects"} legacyBehavior>
        <a data-active={isActive("/stuAllProjects")}>PROJECTS</a>
      </Link>
    </div>,
    <div key={8} className={styles.headerLink}>
      <Link href={"/"} legacyBehavior>
        <a data-active={isActive("/")}>STUDENTS</a>
      </Link>
    </div>,
    <div key={9} className={styles.headerLink}>
      <Link href={"/plSuperPage"} legacyBehavior>
        <a data-active={isActive("/plSuperPage")}>SUPERVISORS</a>
      </Link>
    </div>,
    <div key={10} className={styles.headerLink}>
      <Link href={"/"} legacyBehavior>
        <a data-active={isActive("/")}>PRESENTATIONS</a>
      </Link>
    </div>,

    <div key={11} className={styles.buttonContainer}>
      <Button
        onClick={() => {
          setAcOrPL(false);
        }}
        className={styles.swapButton}
      >
        Swap to Academic View
      </Button>
    </div>,

    <div key={12} className={styles.buttonContainer}>
      <Button
        onClick={() => {
          setAcOrPL(true);
        }}
        className={styles.swapButton}
      >
        Swap to Project Lead View
      </Button>
    </div>,
  ];

  return (
    <>
      <Container className={styles.Header}>
        <div className={styles.headerLogo}></div>
        {userLoginStatus == "student" ? (
          <>
            {navbarElements[0]}
            {navbarElements[1]}
            {navbarElements[2]}
          </>
        ) : userLoginStatus == "academic" ? (
          showAcOrPL ? (
            <>
              {navbarElements[7]}
              {navbarElements[8]}
              {navbarElements[9]}
              {navbarElements[10]}
            </>
          ) : (
            <>
              {navbarElements[3]}
              {navbarElements[5]}
              {navbarElements[6]}
            </>
          )
        ) : null}
      </Container>

      {isProgLead
        ? showAcOrPL
          ? navbarElements[11]
          : navbarElements[12]
        : null}
    </>
  );
}
