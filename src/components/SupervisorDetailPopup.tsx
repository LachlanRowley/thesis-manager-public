"use client"
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import styles from "./SupervisorDetailPopup.module.css"
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Image from "next/image";
import ArrowIMG from "src/img/arrow.png";


export interface SupervisorProps {
    id: string;
    discipline: string;
    school_id: string;
    capacity: number;
    firstname: string;
    lastname: string;
}

export default function SupervisorDetailPopup(prop: SupervisorProps) {
    console.log("prop", prop)
    return (
        <>
            <div className={styles.popup_card}>
                <Grid container>
                    
                    <h1>{prop.firstname} {prop.lastname}</h1>

                    <Grid container item className={styles.popup_content} >
                        
                        <Grid item textAlign="left" xs={12}>
                            <h1 className={styles.title}>GENERAL INFO</h1>
                            
                            <Divider
                                sx={{ borderBottomWidth: 2 }}
                                style={{ background: "#A6192E" }}
                            />
                        </Grid>

                        <Grid container item>
                        
                            <Grid item xs={6} textAlign="left">
                                <p>Discipline:</p>
                            </Grid>

                            <Grid item xs={6} textAlign="right">
                                <p>{prop.discipline}</p>
                            </Grid>

                        </Grid>

                        <Grid container item>

                            <Grid item xs={6} textAlign="left">
                                <p>Capacity:</p>
                            </Grid>

                            <Grid item xs={6} textAlign="right">
                                <p>{prop.capacity}</p>
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid container item >
                        <Grid item textAlign="left" xs={12}>
                            <h1 className={styles.title}>PROJECTS</h1>
                            
                            <Divider
                                sx={{ borderBottomWidth: 2 }}
                                style={{ background: "#A6192E" }}
                            />
                        </Grid>
                        <Grid container item>

                            <Grid item xs={12} textAlign="right">
                                <Button className={styles.sp}>
                                    <h2 className={styles.sptxt}>View Projects</h2>
                                    <Image src={ArrowIMG} alt="Arrow" width={50} height={50} />
                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid container item>
                        <Grid item textAlign="left" xs={12}>
                            <h1 className={styles.title}>STUDENTS</h1>
                            
                            <Divider
                                sx={{ borderBottomWidth: 2 }}
                                style={{ background: "#A6192E" }}
                            />
                        </Grid>
                        <Grid container item>

                            <Grid item xs={12} textAlign="right">
                                <Button className={styles.sp}>
                                    <h2 className={styles.sptxt}>View Students</h2>
                                    <Image src={ArrowIMG} alt="Arrow" width={50} height={50} />
                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid container item className={styles.popup_content}>
                        <Grid item textAlign="left" xs={12}>
                            <h1 className={styles.title}>MARKING LOAD</h1>
                            
                            <Divider
                                sx={{ borderBottomWidth: 2 }}
                                style={{ background: "#A6192E" }}
                            />
                        </Grid>
                        <Grid container item>

                            <Grid item xs={6} textAlign="left">
                                <p>Reports:</p>
                            </Grid>

                            <Grid item xs={6} textAlign="right">
                                <p>5</p>
                            </Grid>

                        </Grid>

                        <Grid container item>

                            <Grid item xs={12} textAlign="right">
                                <Button className={styles.sp}>
                                    <h2 className={styles.sptxt}>Edit Report Allocation</h2>
                                    <Image src={ArrowIMG} alt="Arrow" width={50} height={50} />
                                </Button>
                            </Grid>

                        </Grid>

                        <Grid container item>

                            <Grid item xs={6} textAlign="left">
                                <p>Presentation Sessions:</p>
                            </Grid>

                            <Grid item xs={6} textAlign="right">
                                <p>3</p>
                            </Grid>

                        </Grid>

                        <Grid container item>

                            <Grid item xs={12} textAlign="right">
                                <Button className={styles.sp}>
                                    <h2 className={styles.sptxt}>Edit Presentation Allocation</h2>
                                    <Image src={ArrowIMG} alt="Arrow" width={50} height={50} />
                                </Button>
                            </Grid>
                            
                        </Grid>

                    </Grid>

                </Grid>
            </div>
        </>
    );
}