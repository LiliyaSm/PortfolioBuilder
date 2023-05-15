/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { server } from "../config";
import { Project, ValidationErrors, ISkills } from "../types";
import {
  withAuthSync,
  redirectOnError,
  createErrors,
  createObjectFromForm,
} from "../utils";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Router from "next/router";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import Skills from "./Skills";
import _ from "lodash";
import ProjectSectionButtons from "./ProjectSectionButtons";

const createSkillsList = (skills: string[]) => {
  return _.chain(skills).groupBy("type").value();
};

const ProjectSection = ({
  project,
  token,
  setNewProject,
}: {
  project: Partial<Project>;
  token: string;
  setNewProject: (a: boolean) => void;
}) => {
  const [size, setSize] = React.useState<string>(project.size || "");
  const [cloud, setCloud] = useState<string>(project.cloud || "");
  const [languages, setLanguages] = useState<ISkills[]>([]);
  const [tools, setTools] = useState<ISkills[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  useEffect(() => {
    const skillsList = createSkillsList(project.skills);
    if (skillsList.language) setLanguages(skillsList.language);
  }, []);

  const createNewProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = `${server}/api/portfolios/${project.portfolioId}/project`;
    const data = new FormData(event.currentTarget);
    const object = createObjectFromForm(data);
    const projectSkills = [...languages];

    object.skills = projectSkills;

    console.log("createNewProject", object);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(object),
    };

    const response = await fetch(apiUrl, requestOptions);
    if (response.ok) {
      Router.push(`/portfolio/${project.portfolioId}`);
      setNewProject(false);
    } else {
      const {
        error: { errors },
      } = await response.json();
      const errorsToDisplay = createErrors(errors);
      setValidationErrors(errorsToDisplay);
      console.log(errorsToDisplay);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };

  const handleSelectCloudChange = (event: SelectChangeEvent) => {
    setCloud(event.target.value as string);
  };

  const handleUpdateProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const apiUrl = `${server}/api/projects/${project.id}`;
    const data = new FormData(event.currentTarget);
    const object = createObjectFromForm(data);
    const projectSkills = [...languages];

    object.skills = projectSkills;

    console.log("handleUpdateProject", object);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(object),
    };

    const response = await fetch(apiUrl, requestOptions);

    if (response.ok) {
      Router.push(`/portfolio/${project.portfolioId}`);
    } else {
      const {
        error: { errors },
      } = await response.json();
      const errorsToDisplay = createErrors(errors);
      setValidationErrors(errorsToDisplay);
      console.log(errorsToDisplay);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={project.id ? handleUpdateProject : createNewProject}
      sx={{
        my: 4,
        px: 1,
        py: 2,
        border: "ridge 1px #9C27B0",
        borderRadius: "8px",
      }}
    >
      <Box>
        <TextField
          fullWidth
          color="secondary"
          id="clientName"
          label="Project client name"
          defaultValue={project.clientName}
          name="clientName"
          error={Boolean(validationErrors.clientName)}
          helperText={
            validationErrors.clientName ? validationErrors.clientName : " "
          }
        />
      </Box>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          color="secondary"
          id="projectName"
          label="Project name"
          defaultValue={project.projectName}
          name="projectName"
          error={Boolean(validationErrors.projectName)}
          helperText={
            validationErrors.projectName ? validationErrors.projectName : " "
          }
        />
        <TextField
          fullWidth
          color="secondary"
          id="clientIndustry"
          label="Client industry"
          defaultValue={project.clientIndustry}
          name="clientIndustry"
          error={Boolean(validationErrors.clientIndustry)}
          helperText={
            validationErrors.clientIndustry
              ? validationErrors.clientIndustry
              : " "
          }
        />
      </Stack>
      <TextField
        fullWidth
        color="secondary"
        id="clientDescription"
        label="Client description"
        multiline
        rows={2}
        defaultValue={project.clientDescription}
        name="clientDescription"
        error={Boolean(validationErrors.clientDescription)}
        helperText={
          validationErrors.clientDescription
            ? validationErrors.clientDescription
            : " "
        }
      />
      <TextField
        fullWidth
        color="secondary"
        id="projectDescription"
        label="Project description"
        multiline
        rows={3}
        defaultValue={project.projectDescription}
        name="projectDescription"
        error={Boolean(validationErrors.projectDescription)}
        helperText={
          validationErrors.projectDescription
            ? validationErrors.projectDescription
            : " "
        }
      />
      <Stack direction="row" alignItems="center" justifyContent="flex-start">
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              required
              name="startDate"
              label="Start date"
              defaultValue={dayjs(project.startDate || "")}
              helperText={
                validationErrors.startDate ? validationErrors.startDate : " "
              }
              sx={{ minWidth: 140 }}
              format="YYYY-MM-DD"
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              required
              name="endDate"
              label="End date"
              defaultValue={dayjs(project.endDate || "")}
              helperText={
                validationErrors.endDate ? validationErrors.endDate : " "
              }
              format="YYYY-MM-DD"
              sx={{ minWidth: 140, ml: 3 }}
            />
          </LocalizationProvider>
        </Box>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          mb: 2,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            mr: 2,
          }}
        >
          <InputLabel id="size-label">Select project size</InputLabel>
          <Select
            sx={{ minWidth: 160, ml: 2 }}
            labelId="size-label"
            id="size"
            name="size"
            required
            color="secondary"
            onChange={handleSelectChange}
            value={size}
            error={Boolean(validationErrors.size)}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </Stack>
        <Stack direction="row" alignItems="center">
          <InputLabel id="cloud-label">Select cloud</InputLabel>
          <Select
            sx={{ minWidth: 160, ml: 2 }}
            labelId="cloud-label"
            id="cloud"
            name="cloud"
            required
            color="secondary"
            onChange={handleSelectCloudChange}
            value={cloud}
            error={Boolean(validationErrors.cloud)}
          >
            <MenuItem value="AWS">AWS</MenuItem>
            <MenuItem value="azure">Azure</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </Stack>
      </Stack>
      <TextField
        fullWidth
        color="secondary"
        id="actions"
        label="Actions"
        multiline
        rows={3}
        defaultValue={project.actions}
        name="actions"
        error={Boolean(validationErrors.actions)}
        helperText={validationErrors.actions ? validationErrors.actions : " "}
      />
      <TextField
        fullWidth
        color="secondary"
        id="outcome"
        label="Outcome"
        multiline
        rows={3}
        defaultValue={project.outcome}
        name="outcome"
        error={Boolean(validationErrors.outcome)}
        helperText={validationErrors.outcome ? validationErrors.outcome : " "}
      />
      <Typography variant="h5" sx={{ ml: 1, mt: 1 }}>
        Skills
      </Typography>
      <Box>
        <Skills
          // key={value}
          setFunction={setLanguages}
          name="Language"
          defaultValue={languages}
        />
      </Box>
      <ProjectSectionButtons
        setNewProject={setNewProject}
        projectId={project.id}
      />
    </Box>
  );
};

export default ProjectSection;
