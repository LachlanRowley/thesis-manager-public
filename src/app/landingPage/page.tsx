"use client";

import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Logo from "../../img/mqlogo.png";
import { getCurrentUser } from "../../frontendUtils/getCurrentUser";
import { useRouter } from "next/navigation";

function LandingPage() {
  const router = useRouter();

  // on page load, redirect user to the appropriate page based on their role
  // IF Next Auth middleware can be correctly configured to redirect users,
  // this will become unecessary
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user != null) {
        if (user.program_lead === true) {
          router.push("/stuAllProjects");
        }
        if (user.user_type_id === "student") {
          router.push("/stuAllProjects");
        } else if (user.user_type_id === "academic") {
          router.push("/acdViewProjects");
        } else {
          console.log("====================================");
          console.log("ERROR: unrecognised user type");
          console.log("====================================");
        }
      }
    });
  }, []);

  // provide a basic waiting page while the user is redirected
  return (
    <Stack
      className={styles.MainStack}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image className={styles.Logo} src={Logo} alt="Macquarie Uni Logo" />
      <h1 className={styles.Title}>Welcome to APEX!</h1>
      <h3>Please wait while you are redirected to the correct page...</h3>
    </Stack>
  );
}

export default LandingPage;
