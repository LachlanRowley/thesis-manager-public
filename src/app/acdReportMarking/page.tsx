"use client"

import React, { useState } from "react"
import Titlebar from "../../components/Titlebar";
import Grid from "@mui/material/Grid";
import styles from "./page.module.css"
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";


export default function acdReportMarking() {
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
                <Titlebar titleText="Report Marking" />

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
                            <h1>FIRST MARKING ASSIGNMENT</h1>
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

                            <Grid item xs={6}>Student Name:</Grid>
                            <Grid item xs={6} textAlign={"right"}>John Smith</Grid>

                            <Grid item xs={6}>SID: </Grid>
                            <Grid item xs={6} textAlign={"right"}>44445555</Grid>

                            <Grid item xs={6}>Project Title:</Grid>
                            <Grid item xs={6} textAlign={"right"}>An Excellent but Tedious Porject for Undergraduates</Grid>

                            <Grid item xs={6}>Report Submission Deadline:</Grid>
                            <Grid item xs={6} textAlign={"right"}>Wednesday 20th September</Grid>

                            <Grid item xs={6}>Marking Deadline:</Grid>
                            <Grid item xs={6} textAlign={"right"}>Sunday 5th November</Grid>

                        </Grid>

                        <Grid item>
                            <h1>SECOND MARKING ASSIGNMENT</h1>
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

                            <Grid item xs={6}>Student Name:</Grid>
                            <Grid item xs={6} textAlign={"right"}>John Smith</Grid>

                            <Grid item xs={6}>SID: </Grid>
                            <Grid item xs={6} textAlign={"right"}>44445555</Grid>

                            <Grid item xs={6}>Project Title:</Grid>
                            <Grid item xs={6} textAlign={"right"}>An Excellent but Tedious Porject for Undergraduates</Grid>

                            <Grid item xs={6}>Report Submission Deadline:</Grid>
                            <Grid item xs={6} textAlign={"right"}>Wednesday 20th September</Grid>

                            <Grid item xs={6}>Marking Deadline:</Grid>
                            <Grid item xs={6} textAlign={"right"}>Sunday 5th November</Grid>

                        </Grid>

                    </Grid>
                </Box>

            </main>
        </div>
    );
}