"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./Post.module.css";
import Link from "next/link";
import type { Project, Supervisor, User } from "@prisma/client";
import ProjectPopup from "./ProjectPopup";
import SmallPopup from "./SmallPopup";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from "@mui/material";

export type PostProps = Project & {
  supervisor: Supervisor | null;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Post({
  post,
  onSelectProject,
  showSelectButton,
}: {
  post: PostProps;
  onSelectProject?: (project: PostProps) => void;
  showSelectButton: boolean;
}) {
  const authorName = post.supervisor?.academic_id
    ? post.supervisor.academic_id
    : "Unknown author";

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box className={styles.popup_box}>
          <ProjectPopup
            post={post}
            onSelectProject={onSelectProject}
            showSelectButton={showSelectButton}
            handleClose={handleClose}
          />
        </Box>
      </Modal>

      <div onClick={handleOpen}>
        <Card className={styles.card}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <h2>{post.title}</h2>
                {/* <h3>{post.disciplines}</h3> */}
                <h3>disciplines</h3>
                <h4>Supervised by: {authorName}</h4>
              </Grid>
              <Grid item xs={0}>
                <Divider
                  orientation="vertical"
                  sx={{
                    width: "2px",
                    background: "#A6192E",
                    height: "92%",
                  }}
                />
              </Grid>
              <Grid item xs={5.5} className={styles.description}>
                {post.description}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
