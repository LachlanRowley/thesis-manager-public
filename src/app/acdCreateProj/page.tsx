"use client";

import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Titlebar from "../../components/Titlebar";
import { useRouter } from "next/navigation";
import { getAcademicNames } from "../../frontendUtils/getAcademics";
import { getLabOptions } from "../../frontendUtils/getLabs";
import { getCurrentUser } from "../../frontendUtils/getCurrentUser";

export interface IAcdCreateProjProps {}

// for saving form data
interface FormData {
  title: string;
  coSupervisor: string;
  researchQ: string;
  probDesc: string;
  skills: string;
  status: string;
  labs: Number[];
  projectSize: number;
  projectType: string;
  isIndustry: boolean;
  indSupervisor: string;
  disciplines: string[];
}

// for saving form error messages
interface FormErrors {
  title: string;
  coSupervisor: string;
  researchQ: string;
  probDesc: string;
  skills: string;
  status: string;
  labs: string;
  projectSize: string;
  projectType: string;
  isIndustry: string;
  indSupervisor: string;
  disciplines: string;
}

export default function AcdCreatProj(props: IAcdCreateProjProps) {
  // get router for navigation
  const router = useRouter();

  // initialise formData
  const [formData, setFormData] = useState<FormData>({
    title: "",
    coSupervisor: "",
    researchQ: "",
    probDesc: "",
    skills: "",
    status: "unavailable",
    labs: [],
    projectSize: 1,
    projectType: "Undergraduate",
    isIndustry: false,
    indSupervisor: "",
    disciplines: [],
  });

  // initialise formErrors
  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: "",
    coSupervisor: "",
    researchQ: "",
    probDesc: "",
    skills: "",
    status: "",
    labs: "",
    projectSize: "",
    projectType: "",
    isIndustry: "",
    indSupervisor: "",
    disciplines: "",
  });

  // initialise data for autocomplete boxes
  const [availSupers, setAvailSupers] = useState<
    { label: string; uniId: string }[]
  >([]);
  const [availLabs, setAvailLabs] = useState<{ label: string; id: Number }[]>(
    []
  );

  // list of disciplines available to choose from
  const availableDisciplines: string[] = [
    "Civil",
    "Electrical",
    "Electronics",
    "Mechanical",
    "Mechatronics",
    "Software",
    "Telecommunications",
  ];

  // get list of available supervisors
  useEffect(() => {
    getAcademicNames().then((val) => setAvailSupers(val));
  });

  // get list of available labs
  useEffect(() => {
    getLabOptions().then((val) => setAvailLabs(val));
  });

  // validation function for form submission
  function validate() {
    let valid = true;
    let errors: FormErrors = {
      title: "",
      coSupervisor: "",
      researchQ: "",
      probDesc: "",
      skills: "",
      status: "",
      labs: "",
      projectSize: "",
      projectType: "",
      isIndustry: "",
      indSupervisor: "",
      disciplines: "",
    };

    // title
    if (formData.title === "") {
      errors.title = "Please enter a title";
      valid = false;
    }

    // research q
    if (formData.researchQ === "") {
      errors.researchQ = "Please enter a research question";
      valid = false;
    }

    // description
    if (formData.probDesc === "") {
      errors.probDesc = "Please enter a problem description";
      valid = false;
    }

    // size

    // co-supervisor

    // skills
    if (formData.skills === "") {
      errors.skills = "Please enter some required skills";
      valid = false;
    }

    // labs

    // industry supervisor
    if (formData.isIndustry === true && formData.indSupervisor === "") {
      errors.indSupervisor =
        "An industry project must have an industry supervisor";
      valid = false;
    }

    // disciplines
    if (formData.disciplines.length === 0) {
      errors.disciplines = "Please select at least one discipline";
      valid = false;
    }

    // update error strings
    setFormErrors(errors);

    return valid;
  }

  // submit function for form
  async function onSubmit(event: React.FormEvent) {
    // intercept default event
    event.preventDefault();

    // validate form and don't allow submission if invalid
    let valid = validate();
    if (!valid) {
      return;
    }

    // get current user info
    const currentUser = await getCurrentUser();

    // prevent submission if the user isn't logged in or isn't academic
    if (!currentUser) {
      console.log("====================================");
      console.log("ERROR: you must be logged in to create a project");
      console.log("====================================");
      return;
    }
    if (!currentUser.academic) {
      console.log("====================================");
      console.log("ERROR: you must be an academic to create a project");
      console.log("====================================");
      return;
    }

    // create the project data to send to the database
    const newProject = {
      title: formData.title,
      research_question: formData.researchQ,
      description: formData.probDesc,
      skills: formData.skills,
      status: formData.status,
      project_type: formData.projectType.toLowerCase(),
      industry_topic: formData.isIndustry,
      industry_supervisor:
        formData.indSupervisor === "" || !formData.isIndustry
          ? null
          : formData.indSupervisor,
      size: formData.projectSize,
      supervisor_id: currentUser.academic.uni_id,
      supervisor: currentUser.firstname + " " + currentUser.lastname,
      discipline_list: formData.disciplines.map((value) => value.toLowerCase()),
      co_supervisors_list:
        formData.coSupervisor === "" ? [] : [formData.coSupervisor],
      labs_list: formData.labs,
    };

    // call the api to create the project
    fetch("/api/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    // return the appropriate page
    router.push("/stuAllProjects");
  }

  // react components
  return (
    <div>
      <Titlebar titleText="Academic: Create New Project" />
      <Box
        sx={{
          backgroundColor: "Background",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <form noValidate onSubmit={onSubmit}>
          <FormControl fullWidth margin="normal">
            <h2>GENERAL PROJECT DETAILS</h2>
            <Divider />
            <TextField
              id="title-input"
              label="Title"
              type="text"
              variant="filled"
              onChange={(event) =>
                setFormData({ ...formData, title: event.target.value })
              }
              helperText={formErrors.title}
              error={formErrors.title !== ""}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <TextField
              id="research-q-input"
              label="Research Question"
              type="text"
              variant="filled"
              onChange={(event) =>
                setFormData({ ...formData, researchQ: event.target.value })
              }
              helperText={formErrors.researchQ}
              error={formErrors.researchQ !== ""}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <TextField
              id="prob-desc-input"
              label="Problem Description"
              type="text"
              variant="filled"
              multiline={true}
              rows={7}
              onChange={(event) =>
                setFormData({ ...formData, probDesc: event.target.value })
              }
              helperText={formErrors.probDesc}
              error={formErrors.probDesc !== ""}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <TextField
              id="size-input"
              label="Project Size"
              type="number"
              inputProps={{ min: 1 }}
              value={formData.projectSize}
              variant="filled"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  projectSize: parseInt(event.target.value),
                })
              }
              helperText={formErrors.projectSize}
              error={formErrors.projectSize !== ""}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <FormControl error={formErrors.projectType !== ""}>
              <Select
                id="type-select"
                label="Project Type"
                variant="filled"
                displayEmpty
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return "Please select the project type";
                  } else {
                    return selected;
                  }
                }}
                value={formData.projectType}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    projectType: event.target.value,
                  })
                }
              >
                {["Undergraduate", "Masters", "Both"].map((value) => (
                  <MenuItem value={value}>{value}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{formErrors.projectType}</FormHelperText>
            </FormControl>
            <Autocomplete
              id="co-supervisor-input"
              options={availSupers}
              renderInput={(params) => (
                <TextField {...params} label="Co-Supervisor" />
              )}
              onChange={(event, val) =>
                setFormData({ ...formData, coSupervisor: val?.uniId || "" })
              }
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
            />
            <TextField
              id="skills-input"
              label="Specific Skills Required"
              type="text"
              variant="filled"
              onChange={(event) =>
                setFormData({ ...formData, skills: event.target.value })
              }
              helperText={formErrors.skills}
              error={formErrors.skills !== ""}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <Autocomplete
              id="lab-input"
              multiple
              options={availLabs}
              renderInput={(params) => (
                <TextField {...params} label="Required Labs" />
              )}
              onChange={(event, val) =>
                setFormData({ ...formData, labs: val.map((v) => v.id) || "" })
              }
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="status-checkbox"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      status: event.target.checked
                        ? "available"
                        : "unavailable",
                    })
                  }
                />
              }
              label="is available"
            />
            <h2>INDUSTRY PROJECT DETAILS</h2>
            <Divider />
            <FormControlLabel
              control={
                <Checkbox
                  id="industry-checkbox"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      isIndustry: event.target.checked,
                    })
                  }
                />
              }
              label="is industry project"
            />
            <TextField
              id="ind-supervisor-input"
              label="Industry Supervisor"
              type="text"
              variant="filled"
              onChange={(event) =>
                (formData.indSupervisor = event.target.value)
              }
              helperText={formErrors.indSupervisor}
              error={formErrors.indSupervisor !== ""}
              sx={{ marginTop: "12px", marginBottom: "12px" }}
            />
            <h2>DISCIPLINE DETAILS</h2>
            <Divider />
            <FormControl error={formErrors.disciplines !== ""}>
              <Select
                id="discipline-select"
                label="Discipline"
                variant="filled"
                multiple
                displayEmpty
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return "Please select at least one relevant discipline";
                  } else {
                    return selected.join(", ");
                  }
                }}
                value={formData.disciplines}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    disciplines:
                      typeof event.target.value === "string"
                        ? event.target.value.split(",")
                        : event.target.value,
                  })
                }
              >
                {availableDisciplines.map((value) => (
                  <MenuItem value={value}>{value}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{formErrors.disciplines}</FormHelperText>
            </FormControl>
            <Button id="save-button" type="submit">
              Save Project
            </Button>
          </FormControl>
        </form>
      </Box>
    </div>
  );
}
