/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { server } from "../config";
import { Project, ValidationErrors, ISkills } from "../types";
import {
  withAuthSync,
  redirectOnError,
  createErrors,
  createObjectFromForm,
  generateDropDownFields,
} from "../utils";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Router from "next/router";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ProjectDates from "./ProjectDates";
import { cloudValues, projectSizesValues } from "../constants";
import Skills from "./Skills";
import _ from "lodash";
import ProjectSectionButtons from "./ProjectSectionButtons";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const createSkillsList = (skills: ISkills[]) => {
  return _.chain(skills).groupBy("type").value();
};

const ProjectSection = ({
  project,
  token,
  setNewProject,
}: {
  project: Project;
  token: string;
  setNewProject: (a: boolean) => void;
}) => {
  const [size, setSize] = useState<string>(project.size || "");
  const [cloud, setCloud] = useState<string>(project.cloud || "");
  const [languages, setLanguages] = useState<ISkills[]>([]);
  const [tools, setTools] = useState<ISkills[]>([]);
  const [frameworks, setFrameworks] = useState<ISkills[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const skills = [
    {
      setFunction: setLanguages,
      name: "Language",
      value: languages,
    },
    {
      setFunction: setTools,
      name: "Tool",
      value: tools,
    },
    {
      setFunction: setFrameworks,
      name: "Framework",
      value: frameworks,
    },
  ];

  useEffect(() => {
    const skillsList = createSkillsList(project.skills);
    skills.forEach(({ name, setFunction }) => {
      if (skillsList[name.toLowerCase()]) {
        const skillValue = skillsList[name.toLowerCase()];
        setFunction(skillValue);
      }
    });
  }, []);

  const createNewProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = `${server}/api/portfolios/${project.portfolioId}/project`;
    const data = new FormData(event.currentTarget);
    const object = createObjectFromForm(data);
    const projectSkills = skills.reduce((acc, { value }) => {
      return [...acc, ...value];
    }, []);

    object.skills = projectSkills;

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
    setValidationErrors({});
    const apiUrl = `${server}/api/projects/${project.id}`;
    const data = new FormData(event.currentTarget);
    const object = createObjectFromForm(data);
    const projectSkills = skills.reduce((acc, { value }) => {
      return [...acc, ...value];
    }, []);

    object.skills = projectSkills;
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

  console.log("dayjs(project.endDate) ", project.endDate);

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
      <Stack flexDirection="row" justifyContent="flex-start">
        {project.isDraft && (
          <Chip sx={{ mt: -4, mb: 2, ml: 2 }} color="primary" label="Draft" />
        )}
      </Stack>

      <Box>
        <TextField
          fullWidth
          color="secondary"
          id="clientName"
          label="Client name"
          defaultValue={project.clientName}
          name="clientName"
          error={Boolean(validationErrors.clientName)}
          helperText={validationErrors.clientName ?? " "}
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
          helperText={validationErrors.projectName ?? " "}
        />
        <TextField
          fullWidth
          color="secondary"
          id="clientIndustry"
          label="Client industry"
          defaultValue={project.clientIndustry}
          name="clientIndustry"
          error={Boolean(validationErrors.clientIndustry)}
          helperText={validationErrors.clientIndustry ?? " "}
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
        helperText={validationErrors.clientDescription ?? " "}
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
        helperText={validationErrors.projectDescription ?? " "}
      />
      <ProjectDates validationErrors={validationErrors} project={project} />
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
            flexWrap: "wrap",
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
            {generateDropDownFields(projectSizesValues)}
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
            {generateDropDownFields(cloudValues)}
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
        helperText={validationErrors.actions ?? " "}
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
        helperText={validationErrors.outcome ?? " "}
      />
      <Typography variant="h5" sx={{ ml: 1, mt: 1 }}>
        Skills
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap" }}>
        {skills.map(({ setFunction, name, value }) => {
          return (
            <Skills
              key={name}
              setFunction={setFunction}
              name={name}
              defaultValue={value}
            />
          );
        })}
      </Stack>
      <Box>
        <FormControlLabel
          control={<Checkbox name="isDraft" />}
          label="Save as draft"
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
