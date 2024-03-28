"use client";
import { AssuredWorkloadSharp } from "@mui/icons-material";
import { Stack, Box } from "@mui/material";
import { useEffect, useState } from "react";
import SupervisorCard from "../../components/SupervisorCard";
import styles from "./page.module.css";
import Titlebar from "../../components/Titlebar";

export default function ProgramLeadSuperPage() {
  const [superData, setSuperData] = useState([]);

  const getData = async () => {
    try {
      fetch("/api/supervisor/get", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSuperData(data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //super name, discipline, studnets, capacity
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Titlebar titleText="Supervisors" />
      <main>
        <Box sx={{ marginLeft: "10%", marginRight: "10%", paddingTop: "2%" }}>
          <Stack>
            {superData.map((academic) => (
              <div key={academic.uni_id} className={styles.card}>
                <SupervisorCard
                  id={academic.uni_id}
                  discipline={academic.discipline}
                  school_id={academic.school_id}
                  capacity={academic.capacity}
                  firstname={academic.user.firstname}
                  lastname={academic.user.lastname}
                />
              </div>
            ))}
          </Stack>
        </Box>
      </main>
    </div>
  );
}
