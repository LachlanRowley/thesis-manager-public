import React, { useState, useEffect, ForwardedRef } from "react";
import Post from "./Post";
// import prisma from "../lib/prisma";
//.next
import Image from "next/image";
import SmallPopup from "./SmallPopup";
import ArrowIMG from "../img/arrow.png";
import "./ProjSelectionCard.css";
import prisma from "../lib/prisma";
import EmptyPost from "./EmptyPost";
import SelectFromList from "./SelectFromList";

//TO BE UPDATED
// import type { Project, Preferences, User } from "@prisma/client";

import { Box, Button, Modal, Slide, useTheme } from "@mui/material";
import { getCurrentUser } from "../frontendUtils/getCurrentUser";

//TO BE UPDATED
// export type Props = Project & {
interface Props {
  number: string;
  prefID: number;
  PrefOrder: number;
  userID: number;
}

//TO BE UPDATED

interface SlideTransitionProps {
  children: React.ReactElement;
  in: boolean;
}

//handling modal showing up from low to up
const SlideTransition = React.forwardRef(function Transition(
  props: SlideTransitionProps,
  ref: ForwardedRef<unknown>
) {
  const theme = useTheme();
  const { in: inProp, children } = props;
  return (
    <Slide
      direction="up"
      in={inProp}
      ref={ref}
      timeout={500}
      easing={{
        enter: theme.transitions.easing.sharp,
        exit: theme.transitions.easing.sharp,
      }}
    >
      <div
        style={{
          position: "fixed",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </Slide>
  );
});

//async
function ProjSelectionCard({ number, prefID, PrefOrder, userID }: Props) {
  const [project, setProject] = useState<any | null>(null);
  const [openSelectFromList, setOpenSelectFromList] = useState(false);
  const [uniqueKey, setUniqueKey] = useState(Date.now());

  const handleCloseSelectFromList = () => {
    setOpenSelectFromList(false);
  };

  const handleCloseAll = () => {
    handleCloseSelectFromList();
    handleCloseFromList();
  };

  const handleSelectFromList = async () => {
    handleClose();
    setUniqueKey(Date.now());
    setOpenSelectFromList(true);
  };

  const handleCloseFromList = () => {
    setOpenSelectFromList(false);
  };
  // console.log("thi is the prefff", prefID);

  const [currentPrefs, setCurrentPrefs] = useState<number[]>([]);
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        "http://localhost:3000/api/projects/get?id${prefID}"
      );
      if (response.ok) {
        const data = await response.json();
        // Find the project with the matching prefID
        const matchingProject = data.find((p: any) => p.id === prefID);
        setProject(matchingProject);

        const currentUser = await getCurrentUser();

        let resp = await fetch(
          "http://localhost:3000/api/preferences/getStudentPrefsID?id=" +
            currentUser?.student?.uni_id
        );
        let options = await resp.json();
        const optionsArray = Object.values(options);
        console.log("Options as an array:", optionsArray);

        const newCurrentPrefs = optionsArray as number[];
        console.log("pref id is " + newCurrentPrefs);
        setCurrentPrefs(newCurrentPrefs);
      } else {
        console.error("Failed to fetch projects.");
      }
    };
    fetchData();
  }, [prefID]);

  const handleSelectProject = async (selectedProject: any) => {
    // UpdateCurrentPrefs
    const prefIndex = PrefOrder - 1;
    const updatedPrefs = [...currentPrefs];

    const existingIndex = updatedPrefs.indexOf(selectedProject.id);

    if (existingIndex !== -1) {
      if (existingIndex === prefIndex) {
        setShowAlertModal(true);
        return;
      } else {
        [updatedPrefs[prefIndex], updatedPrefs[existingIndex]] = [
          updatedPrefs[existingIndex],
          updatedPrefs[prefIndex],
        ];
      }
    } else {
      updatedPrefs[prefIndex] = selectedProject.id;
    }
    //Add prefid into a new parameter

    for (let i = 0; i < 5; i++) {
      if (updatedPrefs[i] == null) {
        updatedPrefs[i] = i;
      }
    }

    setCurrentPrefs(updatedPrefs);
    console.log("NOW curernt pref is ", currentPrefs);

    const uPrefs = {
      student_id: userID,
      newPrefs: updatedPrefs,
      // [newPara.p1, newPara.p2, newPara.p3, newPara.p4, newPara.p5],
    };
    console.log("The final updated data is ", uPrefs);

    //Update to server
    fetch("/api/preferences/updateStudentPrefs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uPrefs),
    }).then(() => {
      window.location.reload();
    });

    setCurrentPrefs(updatedPrefs);
  };

  const handleAlertModalClose = () => {
    setShowAlertModal(false);
    window.location.reload();
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "367px",
    height: "189px",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "33px",
  };

  const modalStyle2 = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    height: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
  };

  return (
    <div className="box">
      <Modal open={openSelectFromList} closeAfterTransition>
        <SlideTransition in={openSelectFromList}>
          <Box sx={modalStyle2} key={uniqueKey}>
            <SelectFromList
              onClose={handleCloseAll}
              onSelectProject={handleSelectProject}
            />
          </Box>
        </SlideTransition>
      </Modal>

      <Modal open={showAlertModal} onClose={() => setShowAlertModal(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#d5d2c5",
            color: "#A6192E",
            fontSize: "20px",
            textAlign: "center",
            p: 3,
            ...modalStyle,
          }}
        >
          <div>
            <div>This project is already selected</div>
            <Button
              onClick={handleAlertModalClose}
              className="sp"
              sx={{
                mt: 5,
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#d5d2c5",
                },
                borderRadius: 30,
              }}
            >
              <h1 className="sptxt">OK</h1>
              <Image src={ArrowIMG} alt="Arrow" width={50} height={50} />
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <SmallPopup onSelectFromList={handleSelectFromList} />
          {/* post info need to pass in the small popup */}
        </Box>
      </Modal>

      <div className="infoBox">
        <h1 className="info">{number} Preference</h1>

        <Button className="sp" onClick={handleOpen}>
          <h1 className="sptxt">Select Project</h1>
          <Image src={ArrowIMG} alt="Arrow" width={50} height={50} />
        </Button>
      </div>
      <div className="redLine"></div>
      {project && <Post post={project} showSelectButton={false} />}
      {/* <EmptyPost /> */}
    </div>
  );
}

export default ProjSelectionCard;
