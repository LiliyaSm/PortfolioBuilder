/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { server } from "@/config";
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
  SMALL_SCREEN,
} from "@/constants";
import Skills from "@/components/Project/Skills";
import ProjectChip from "@/components/Project/ProjectChip";
import ProjectSectionButtons from "@/components/Project/ProjectSectionButtons";
import AIButton from "@/components/Project/AIButton";
import ProjectSectionDropdowns from "@/components/Project/ProjectSectionDropdowns";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import _ from "lodash";
import { useSession } from "next-auth/react";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IProjectSection {
  isNewProject?: boolean;
  project: Partial<Project>;
  setNewProject: (a: boolean) => void;
}

const ProjectSection = ({
  project,
  setNewProject,
  isNewProject = false,
}: IProjectSection) => {
  const projectSectionRef = React.createRef<HTMLDivElement>();

  const [clientIndustry, setClientIndustry] = useState<string>(
    project.clientIndustry || ""
  );
  const [projectType, setProjectType] = useState<string>(
    project.projectType || ""
  );
  const [languages, setLanguages] = useState<ISkills[]>([]);
  const [tools, setTools] = useState<ISkills[]>([]);
  const [frameworks, setFrameworks] = useState<ISkills[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actions, setActions] = useState<string>(project.actions || "");
  const [outcome, setOutcome] = useState<string>(project.outcome || "");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const { data: session } = useSession();
  const token = session?.user?.token;
  const isSmallScreen = useMediaQuery(SMALL_SCREEN);

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
      if (projectSectionRef?.current !== null) {
        window.scrollTo({
          behavior: "smooth",
          top: projectSectionRef?.current.offsetTop - PADDING_TOP,
        });
      }
    }
    // set skills if exist
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
    if (isLoading) return;
    setIsLoading(true);
    event.preventDefault();
    const apiUrl = `${server}/api/portfolios/${project.portfolioId}/project`;
    const data = new FormData(event.currentTarget);
    let projectData = createObjectFromForm(data);
    const projectSkills = _(skills)
      .map((x) => x.value)
      .flatten();

    projectData = { ...projectData, skills: projectSkills, actions, outcome };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    };

    const response = await fetch(apiUrl, requestOptions);
    if (response.ok) {
      Router.push(`/portfolios/${project.portfolioId}/edit`);
      setNewProject(false);
      displayToastSuccess("Successfully created");
      setIsLoading(false);
    } else {
      const {
        error: { errors },
      } = await response.json();
      const errorsToDisplay = createErrors(errors);
      setValidationErrors(errorsToDisplay);
      setIsLoading(false);
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
    if (isLoading) return;
    setIsLoading(true);
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
    const updatedObject = { ...object, ...updatedFields, actions, outcome };
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
      Router.push(`/portfolios/${project.portfolioId}/edit`);
      displayToastSuccess("Successfully updated");
      setIsLoading(false);
    } else {
      const {
        error: { errors },
      } = await response.json();
      const errorsToDisplay = createErrors(errors);
      setValidationErrors(errorsToDisplay);
      setIsLoading(false);
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
        {isNewProject && <ProjectChip label="New project" />}
      </Stack>

      <Stack direction={isSmallScreen ? "column" : "row"} spacing={1}>
        <TextField
          fullWidth
          color="secondary"
          id="clientName"
          label="Client name"
          defaultValue={project.clientName}
          name="clientName"
          error={Boolean(validationErrors.clientName)}
          helperText={validationErrors.clientName ?? " "}
          sx={{ minWidth: "270px" }}
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
          <InputLabel color="secondary" id="client-industry-label">
            Client industry
          </InputLabel>
          <Select
            sx={{ minWidth: 270, ml: 2 }}
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
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        alignContent="center"
        spacing={1}
      >
        <TextField
          fullWidth
          color="secondary"
          id="projectName"
          label="Project name"
          defaultValue={project.projectName}
          name="projectName"
          error={Boolean(validationErrors.projectName)}
          sx={{ minWidth: "270px" }}
          helperText={validationErrors.projectName ?? " "}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={isSmallScreen ? "flex-start" : "flex-end"}
          sx={{
            mr: 2,
            pb: 3,
            minWidth: "400px",
          }}
        >
          <InputLabel id="project-type-label">Project type</InputLabel>
          <Select
            sx={{ minWidth: 275, ml: 2 }}
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
      <Box sx={{ position: "relative" }}>
        <TextField
          fullWidth
          color="secondary"
          id="actions"
          label="Actions"
          multiline
          rows={3}
          defaultValue={project.actions}
          value={actions}
          onChange={(e) => setActions(e.target.value)}
          error={Boolean(validationErrors.actions)}
          inputProps={{ style: { resize: "vertical" } }}
          helperText={validationErrors.actions ?? " "}
        />
        <AIButton text={actions} setResult={setActions} />
      </Box>
      <Box sx={{ position: "relative" }}>
        <TextField
          fullWidth
          color="secondary"
          id="outcome"
          label="Outcome"
          multiline
          rows={3}
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          defaultValue={project.outcome}
          error={Boolean(validationErrors.outcome)}
          inputProps={{ style: { resize: "vertical" } }}
          helperText={validationErrors.outcome ?? " "}
        />
        <AIButton text={outcome} setResult={setOutcome} />
      </Box>
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
        isLoading={isLoading}
        setNewProject={setNewProject}
        project={project}
      />
    </Box>
  );
};

export default ProjectSection;
