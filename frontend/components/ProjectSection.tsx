/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { server } from "../config";
import { Project, ValidationErrors, ISkills } from "../types";
import {
  createSkillsList,
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
import {
  projectTypes,
  companyIndustries,
  programmingTools,
  programmingLanguages,
  programmingFrameworks,
} from "../constants";
import Skills from "./Skills";
import ProjectSectionButtons from "./ProjectSectionButtons";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ProjectSectionDropdowns from "../components/ProjectSectionDropdowns";
import _ from "lodash"

const ProjectSection = ({
  project,
  token,
  setNewProject,
  setShowAlert,
}: {
  project: Partial<Project>;
  token: string;
  setNewProject: (a: boolean) => void;
  setShowAlert: (a: string) => void;
}) => {
  const [clientIndustry, setClientIndustry] = useState<string>(
    project.clientIndustry || ""
  );
  const [projectType, setProjectType] = useState<string>(
    project.projectType || ""
  );
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
      entities: programmingLanguages,
    },
    {
      setFunction: setTools,
      name: "Tool",
      value: tools,
      entities: programmingTools,
    },
    {
      setFunction: setFrameworks,
      name: "Framework",
      value: frameworks,
      entities: programmingFrameworks,
    },
  ];

  useEffect(() => {
    if (project.skills) {
      const skillsList = createSkillsList(project.skills);
      skills.forEach(({ name, setFunction }) => {
        if (skillsList[name.toLowerCase()]) {
          const skillValue = skillsList[name.toLowerCase()];
          setFunction(skillValue);
        }
      });
    }
  }, []);

  const createNewProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = `${server}/api/portfolios/${project.portfolioId}/project`;
    const data = new FormData(event.currentTarget);
    const object = createObjectFromForm(data);
    const projectSkills = _(skills).map((x) => x.value).flatten();

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
      Router.push(`/portfolio/edit/${project.portfolioId}`);
      setNewProject(false);
      setShowAlert("Created");
    } else {
      const {
        error: { errors },
      } = await response.json();
      const errorsToDisplay = createErrors(errors);
      setValidationErrors(errorsToDisplay);
      console.log(errorsToDisplay);
    }
  };

  const handleSelectProjectTypeChange = (event: SelectChangeEvent) => {
    setProjectType(event.target.value as string);
  };

  const handleSelectClientIndustryChange = (event: SelectChangeEvent) => {
    setClientIndustry(event.target.value as string);
  };

  const handleUpdateProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setValidationErrors({});
    const apiUrl = `${server}/api/projects/${project.id}`;
    const data = new FormData(event.currentTarget);
    const object = createObjectFromForm(data);
    const projectSkills = _(skills).map((x) => x.value).flatten();

    object.skills = projectSkills;
    object.isDraft = object.isDraft ? true : false;
    object.endDate = object.endDate ?? null;
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
      Router.push(`/portfolio/edit/${project.portfolioId}`);
      setShowAlert("Updated");
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
      <Stack flexDirection="row" justifyContent="flex-start">
        {project.isDraft && (
          <Chip
            sx={{ mt: -4, mb: 2, ml: 2 }}
            color="primary"
            label="Draft"
            title="Draft portfolios are not available in the view"
          />
        )}
      </Stack>

      <Stack direction="row" spacing={1}>
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
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            mr: 2,
            pb: 3,
            minWidth: "400px",
          }}
        >
          <InputLabel id="client-industry-label">Client industry</InputLabel>
          <Select
            sx={{ minWidth: 280, ml: 2 }}
            labelId="client-industry-label"
            id="client-industry"
            name="clientIndustry"
            color="secondary"
            onChange={handleSelectClientIndustryChange}
            value={clientIndustry}
            error={Boolean(validationErrors.clientIndustry)}
          >
            {generateDropDownFields(companyIndustries)}
          </Select>
        </Stack>
      </Stack>
      <Stack direction="row" alignContent="center" spacing={1}>
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            mr: 2,
            pb: 3,
            minWidth: "400px",
          }}
        >
          <InputLabel id="project-type-label">Project type</InputLabel>
          <Select
            sx={{ minWidth: 280, ml: 2 }}
            labelId="project-type-label"
            id="project-type"
            name="projectType"
            color="secondary"
            onChange={handleSelectProjectTypeChange}
            value={projectType}
            error={Boolean(validationErrors.projectType)}
          >
            {generateDropDownFields(projectTypes)}
          </Select>
        </Stack>
      </Stack>
      <TextField
        fullWidth
        color="secondary"
        id="clientDescription"
        label="Client description (optional)"
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
          flexWrap: "wrap",
        }}
      >
        <ProjectSectionDropdowns
          project={project}
          validationErrors={validationErrors}
        />
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
        {skills.map(({ setFunction, name, value, entities }) => {
          return (
            <Skills
              key={name}
              setFunction={setFunction}
              name={name}
              defaultValue={value}
              entities={entities}
            />
          );
        })}
      </Stack>
      <Box>
        <FormControlLabel
          control={<Checkbox color="secondary" name="isDraft" />}
          label="Save as draft (will not be available in the view)"
        />
      </Box>
      <ProjectSectionButtons
        setNewProject={setNewProject}
        project={project}
        token={token}
        setShowAlert={setShowAlert}
      />
    </Box>
  );
};

export default ProjectSection;
