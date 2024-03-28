"use client";
import prisma from "../../lib/prisma";
import React, { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import ProjSelectionCard from "../../components/ProjSelectionCard";
import Titlebar from "../../components/Titlebar";
import { getCurrentUser } from "../../frontendUtils/getCurrentUser";

function ProjectSelection() {
  const [options, setOptions] = useState({
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
  });

  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      setCurrentUser(currentUser);
      // console.log("current user is " + currentUser);

      try {
        let response = await fetch(
          "http://localhost:3000/api/preferences/getStudentPrefsID?id=" +
            currentUser?.student?.uni_id
        );

        if (response.ok) {
          let pref = await response.json();

          // console.log("Preferences from API:", pref);
          setOptions({
            p1: pref[0],
            p2: pref[1],
            p3: pref[2],
            p4: pref[3],
            p5: pref[4],
          });
          // console.log("Options after setting:", options);
        } else {
          console.error("Failed to fetch preferences", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchData();
  }, []);

  //Monitor the change of preferences
  // useEffect(() => {
  //   console.log("Updated options:", options);
  // }, [options]);

  return (
    <div className="project-selection">
      <Titlebar titleText="Project Selection" />

      <Box sx={{ marginLeft: "10%", marginRight: "10%" }}>
        <div className="card">
          {/* Display currentUser.id */}
          {/* <p>Current Student ID: {currentUser?.student?.uni_id}</p> */}

          {/* THIS IS FOR TESTING PREF1-5 EXISTING */}
          {/* <div>
            {Object.entries(options).map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
          </div> */}

          <Stack>
            <ProjSelectionCard
              number={"First"}
              prefID={options.p1}
              PrefOrder={1}
              userID={currentUser?.student?.uni_id}
            />
            <ProjSelectionCard
              number={"Second"}
              prefID={options.p2}
              PrefOrder={2}
              userID={currentUser?.student?.uni_id}
            />
            <ProjSelectionCard
              number={"Third"}
              prefID={options.p3}
              PrefOrder={3}
              userID={currentUser?.student?.uni_id}
            />
            <ProjSelectionCard
              number={"Forth"}
              prefID={options.p4}
              PrefOrder={4}
              userID={currentUser?.student?.uni_id}
            />
            <ProjSelectionCard
              number={"Fifth"}
              prefID={options.p5}
              PrefOrder={5}
              userID={currentUser?.student?.uni_id}
            />
          </Stack>
        </div>
      </Box>
    </div>
  );
}

export default ProjectSelection;
