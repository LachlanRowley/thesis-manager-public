"use client"

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import styles from "./SupervisorCard.module.css"
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import SupervisorDetailPopup from "./SupervisorDetailPopup";

export interface SupervisorProps {
    id: string;
    discipline: string;
    school_id: string;
    capacity: number;
    firstname: string;
    lastname: string;
}

export default function SupervisorCard(prop: SupervisorProps) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    console.log(prop)

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box className={styles.popup_box}>
                    <SupervisorDetailPopup 
                        id={prop.uni_id}
                        discipline={prop.discipline}
                        school_id={prop.school_id}
                        capacity={prop.capacity}
                        firstname={prop.firstname}
                        lastname={prop.lastname}
                    />
                </Box>
            </Modal>

            <div onClick={handleOpen}>
                <Card className={styles.card}>
                    <Grid container spacing={0}>

                        <Grid item xs={4}>
                            <h2>{prop.firstname} {prop.lastname}</h2>
                        </Grid>

                        <Grid item xs={4} textAlign="center" className={styles.discipline}>
                            <h2>{prop.discipline}</h2>
                        </Grid>

                        <Grid item xs={4} textAlign="right" className={styles.students}>
                            <h2>{prop.capacity} students</h2>
                        </Grid>

                    </Grid>
                </Card>
            </div>
        </>
    );
}