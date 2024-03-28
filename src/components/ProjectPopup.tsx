import React, { useState } from "react";
import type { Project, Supervisor, User } from "@prisma/client";
import Image from "next/image";

import styles from "./ProjectPopup.module.css";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Divider,
  Button,
  Link,
  Slide,
} from "@mui/material";

// Icons
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ArrowIMG from "../img/arrow.png";

export type PostProps = Project & {
  supervisor: Supervisor | null;
};

export type ProjectPopupProps = {
  post: PostProps;
  onSelectProject?: (project: PostProps) => void;
  showSelectButton: boolean;
  handleClose: () => void;
};
const handleClose = () => {};

export default function ProjectPopup({
  post,
  onSelectProject,
  showSelectButton,
  handleClose,
}: ProjectPopupProps & { handleClose: () => void }) {
  const handleSelectProjectClick = () => {
    if (onSelectProject) {
      onSelectProject(post);
      if (handleClose) {
        handleClose();
      }
    }
  };

  return (
    <>
      <div className={styles.popup_card}>
        <Grid container spacing={2}>
          <Grid item xs={6} className={styles.left}>
            <h1>{post.title}</h1>

            <Divider
              sx={{ borderBottomWidth: 3 }}
              style={{ background: "black" }}
            />

            <Grid
              container
              item
              sx={{ p: 1 }}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={2.5}>
                <HelpCenterOutlinedIcon className={styles.icon} />
              </Grid>
              <Grid item xs={9.5}>
                <h2>{post.research_question}</h2>
              </Grid>
            </Grid>

            <Divider
              sx={{ borderBottomWidth: 3 }}
              style={{ background: "black" }}
            />

            <p>{post.description}</p>
          </Grid>
          <Grid item xs={0}>
            <Divider
              orientation="vertical"
              sx={{ width: "3px", padding: "0" }}
              style={{ background: "#A6192E" }}
            />
          </Grid>
          <Grid item xs={5.5} direction={"column"}>
            <Grid
              container
              item
              direction={"row"}
              xs={12}
              sx={{ color: "#A6192E" }}
              className={styles.card_right}
              spacing={1.5}
            >
              <Grid item xs={5}>
                <Person2OutlinedIcon className={styles.right_icon} />
              </Grid>
              <Grid item textAlign={"right"} alignSelf={"flex-end"} xs={7}>
                <h3>Supervisor: {post.supervisor || "John Smith"}</h3>
              </Grid>

              <Grid item xs={5}>
                <GroupOutlinedIcon className={styles.right_icon} />
              </Grid>
              <Grid item textAlign={"right"} alignSelf={"flex-end"} xs={7}>
                <h3>Co-Supervisor: {post.co_supervisors || "Jane Smith"}</h3>
              </Grid>

              <Grid item xs={5}>
                <EngineeringOutlinedIcon className={styles.right_icon} />
              </Grid>
              <Grid item textAlign={"right"} alignSelf={"flex-end"} xs={7}>
                <h3>
                  Industry Supervisor:{" "}
                  {post.industry_supervisor !== null
                    ? post.industry_supervisor
                    : "None"}
                </h3>
              </Grid>

              <Grid item xs={5}>
                <Groups2OutlinedIcon className={styles.right_icon} />
              </Grid>
              <Grid item textAlign={"right"} alignSelf={"flex-end"} xs={7}>
                <h3>Project Size: {post.size}</h3>
              </Grid>

              <Grid item xs={5}>
                <WorkspacePremiumOutlinedIcon className={styles.right_icon} />
              </Grid>
              <Grid item textAlign={"right"} alignSelf={"flex-end"} xs={7}>
                <h3>Discipline(s): {post.disciplines || "Software"}</h3>
              </Grid>

              <Grid item xs={5}>
                <FactoryOutlinedIcon className={styles.right_icon} />
              </Grid>
              <Grid item textAlign={"right"} alignSelf={"flex-end"} xs={7}>
                <h3>
                  Industry Project:{" "}
                  {post.industry_topic !== false ? "True" : "False"}
                </h3>
              </Grid>

              <Grid item xs={5}>
                <ScienceOutlinedIcon className={styles.right_icon} />
              </Grid>
              <Grid item textAlign={"right"} alignSelf={"flex-end"} xs={7}>
                <h3>Lab Access: None</h3>
              </Grid>

              <Grid item xs={5}>
                <PsychologyOutlinedIcon className={styles.right_icon} />
              </Grid>
              <Grid item textAlign={"right"} alignSelf={"flex-end"} xs={7}>
                <h3>
                  Specific Skills: {post.skills !== null ? post.skills : "None"}
                </h3>
              </Grid>

              <Grid item xs={5}></Grid>
              <Grid item textAlign={"right"} alignSelf={"flex-end"} xs={7}>
                {showSelectButton && (
                  <Button
                    className={styles.sp}
                    onClick={handleSelectProjectClick}
                  >
                    <h1 className={styles.sptxt}>Select Project</h1>
                    <Image src={ArrowIMG} alt="Arrow" width={50} height={50} />
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
