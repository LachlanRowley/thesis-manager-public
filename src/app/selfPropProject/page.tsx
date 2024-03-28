"use client";

import React, { useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import Titlebar from "../../components/Titlebar";
import { useRouter } from "next/navigation";

export interface ISelfPropProjectProps {}

interface FormData {
  title: string;
  supervisor: string;
  coSupervisor: string;
  researchQ: string;
  probDesc: string;
  skills: string;
  labs: string;
}

export default function SelfPropProject(props: ISelfPropProjectProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    supervisor: "",
    coSupervisor: "",
    researchQ: "",
    probDesc: "",
    skills: "",
    labs: "",
  });

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newProject = {
      title: formData.title,
      research_question: formData.researchQ,
      description: formData.probDesc,
      skills: formData.skills,
      status: "available",
      project_type: "both",
      industry_topic: false,
      industry_supervisor: null,
      size: 1,
      supervisor_id: "mq15391351",
      supervisor: "Vanetta Cetin",
      discipline_list: ["software"],
      co_supervisors_list: [],
      labs_list: [],
    };

    console.log("====================================");
    console.log(JSON.stringify(newProject));
    console.log("====================================");

    fetch("/api/projects/createProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    router.push("/projectSelection");
  }

  return (
    <div>
      <Titlebar titleText="New Self-Proposed Project" />
      <Box
        sx={{
          backgroundColor: "Background",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <form noValidate onSubmit={onSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              id="title-input"
              label="Title"
              type="text"
              variant="filled"
              onChange={(event) => (formData.title = event.target.value)}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <TextField
              id="supervisor-input"
              label="Supervisor"
              type="text"
              variant="filled"
              onChange={(event) => (formData.supervisor = event.target.value)}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <TextField
              id="co-supervisor-input"
              label="Co-Supervisor"
              type="text"
              variant="filled"
              onChange={(event) => (formData.coSupervisor = event.target.value)}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <TextField
              id="research-q-input"
              label="Research Question"
              type="text"
              variant="filled"
              onChange={(event) => (formData.researchQ = event.target.value)}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <TextField
              id="prob-desc-input"
              label="Problem Description"
              type="text"
              variant="filled"
              multiline={true}
              rows={7}
              onChange={(event) => (formData.probDesc = event.target.value)}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <TextField
              id="skills-input"
              label="Specific Skills Required"
              type="text"
              variant="filled"
              onChange={(event) => (formData.skills = event.target.value)}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <TextField
              id="lab-input"
              label="Lab Access Required"
              type="text"
              variant="filled"
              onChange={(event) => (formData.labs = event.target.value)}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <Button id="save-button" type="submit">
              Save Project
            </Button>
          </FormControl>
        </form>
      </Box>
    </div>
  );
}
