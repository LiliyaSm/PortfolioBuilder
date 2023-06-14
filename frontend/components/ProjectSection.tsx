/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { server } from "../config";
import { Project, ValidationErrors, ISkills } from "@/types";
import {
  createSkillsList,
  createErrors,
  createObjectFromForm,
  generateDropDownFields,
  displayToastSuccess,
} from "@/utils";
import TextField from "@mui/material/TextField";
import { Stack, Typography, InputLabel, Box } from "@mui/material";
import Router from "next/router";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ProjectDates from "./ProjectDates";
import {
  projectTypes,
  companyIndustries,
  programmingTools,
  programmingLanguages,
  programmingFrameworks,
  PADDING_TOP,
} from "@/constants";
import Skills from "@/components/Skills";
import ProjectChip from "@/components/ProjectChip";
import ProjectSectionButtons from "@/components/ProjectSectionButtons";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ProjectSectionDropdowns from "@/components/ProjectSectionDropdowns";
import _ from "lodash";
import { useSession } from "next-auth/react";

interface IProjectSection {
  isNewProject: boolean;
  project: Partial<Project>;
  setNewProject: (a: boolean) => void;
}

const ProjectSection = ({
  project,
  setNewProject,
  isNewProject,
}: IProjectSection) => {
  const projectSectionRef = React.createRef();

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

  const { data: session } = useSession();
  const token = session?.user?.token;

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
    if (isNewProject) {
      window.scrollTo({
        top: projectSectionRef?.current.offsetTop - PADDING_TOP,
        behavior: "smooth",
      });
    }
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
    const projectSkills = _(skills)
      .map((x) => x.value)
      .flatten();

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
      displayToastSuccess("Created");
    } else {
      const {
        error: { errors },
      } = await response.json();
      const errorsToDisplay = createErrors(errors);
      setValidationErrors(errorsToDisplay);
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
    const projectSkills = _(skills)
      .map((x) => x.value)
      .flatten();

    const updatedFields = {
      skills: projectSkills,
      isDraft: object.isDraft === "on" ? true : false,
      endDate: object.endDate ?? null,
    };
    const updatedObject = { object, ...updatedFields };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedObject),
    };

    const response = await fetch(apiUrl, requestOptions);

    if (response.ok) {
      Router.push(`/portfolio/edit/${project.portfolioId}`);
      displayToastSuccess("Updated");
    } else {
      const {
        error: { errors },
      } = await response.json();
      const errorsToDisplay = createErrors(errors);
      setValidationErrors(errorsToDisplay);
    }
  };

  return (
    <Box
      component="form"
      ref={projectSectionRef}
      onSubmit={project.id ? handleUpdateProject : createNewProject}
      sx={{
        my: 4,
        px: 2,
        py: 3,
        borderRadius: "14px",
        backgroundColor: "white",
      }}
    >
      <Stack flexDirection="row" justifyContent="flex-start">
        {project.isDraft && (
          <ProjectChip
            label="Draft project"
            title="Draft portfolios are not available in the view"
          />
        )}
        {isNewProject && (
          <ProjectChip label="New project"/>
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
            inputProps={{ MenuProps: { disableScrollLock: true } }}
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
            inputProps={{ MenuProps: { disableScrollLock: true } }}
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
      <ProjectSectionButtons setNewProject={setNewProject} project={project} />
    </Box>
  );
};

export default ProjectSection;
