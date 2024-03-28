"use client"

import React, { useState } from "react"
import Titlebar from "../../components/Titlebar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Image from "next/image";

import styles from './page.module.css'
import Button from "@mui/material/Button";
import ArrowIMG from "src/img/arrow.png";

export default function acdPresMarking() {
    const [data, setData] = useState();

    const getData = async () => {
        try {
            fetch("", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setData(data)
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <div>
            <main>
                <Titlebar titleText="Presenation Marking" />

                <Box
                    paddingLeft={"10%"}
                    paddingTop={"20px"}
                    width={"90%"}
                >
                    <Grid container spacing={2} 
                    direction={"column"}
                    className={styles.grid}
                    >
                        
                        <Grid item>
                            <h1>YOU ARE MARKING SESSION 7</h1>
                        </Grid>

                        <Divider
                            orientation="horizontal"
                            sx={{ width: "100%", padding: "0", height: "2px" }}
                            style={{ background: "#A6192E" }}
                            />

                        <Grid container item
                            direction={"row"}
                            xs={12}
                            spacing={4}
                        >

                            <Grid item xs={6}>Role:</Grid>
                            <Grid item xs={6} textAlign={"right"}>Session Chair</Grid>

                            <Grid item xs={6}>Date: </Grid>
                            <Grid item xs={6} textAlign={"right"}>Tuesday 19th September</Grid>

                            <Grid item xs={6}>Time:</Grid>
                            <Grid item xs={6} textAlign={"right"}>10:00am-12:00pm</Grid>

                            <Grid item xs={6}>Location</Grid>
                            <Grid item xs={6} textAlign={"right"}>4RPD 110</Grid>

                            <Grid item xs={6}></Grid>
                            <Grid item xs={6} textAlign={"right"}>
                                <Button className={styles.sp}>
                                    <h2 className={styles.sptxt}>Register Unavailability</h2>
                                    <Image src={ArrowIMG} alt="Arrow" width={50} height={50} />
                                </Button>
                            </Grid>

                            

                        </Grid>

                    </Grid>
                </Box>
            </main>
        </div>
    );
}