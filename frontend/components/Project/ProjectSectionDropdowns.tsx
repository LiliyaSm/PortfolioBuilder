import React, { useState } from "react";
import { generateDropDownFields } from "@/utils";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  cloudValues,
  projectSizesValues,
  projectTeamSizeValues,
  roles,
} from "@/constants";
import { Project, ValidationErrors } from "@/types";

const ProjectSectionDropdowns = ({
  validationErrors,
  project,
}: {
  project: Partial<Project>;
  validationErrors: ValidationErrors;
}) => {
  const [values, setValues] = useState({
    size: project.size || "",
    cloud: project.cloud || "",
    role: project.role || "",
    teamSize: project.teamSize || "",
  });

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          mr: 2,
        }}
      >
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          sx={{ minWidth: 190, ml: 2 }}
          labelId="role-label"
          id="role-size"
          name="role"
          color="secondary"
          onChange={handleChange}
          value={values.role}
          error={Boolean(validationErrors.role)}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          {generateDropDownFields(roles)}
        </Select>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          mr: 2,
          flexWrap: "wrap",
        }}
      >
        <InputLabel id="size-label">Project size</InputLabel>
        <Select
          sx={{ minWidth: 160, ml: 2 }}
          labelId="size-label"
          id="size"
          name="size"
          color="secondary"
          onChange={handleChange}
          value={values.size}
          error={Boolean(validationErrors.size)}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          {generateDropDownFields(projectSizesValues)}
        </Select>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          mr: 2,
          flexWrap: "wrap",
        }}
      >
        <InputLabel id="cloud-label">Cloud</InputLabel>
        <Select
          sx={{ minWidth: 160, ml: 2 }}
          labelId="cloud-label"
          id="cloud"
          name="cloud"
          color="secondary"
          onChange={handleChange}
          value={values.cloud}
          error={Boolean(validationErrors.cloud)}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          {generateDropDownFields(cloudValues)}
        </Select>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          mr: 2,
          flexWrap: "wrap",
        }}
      >
        <InputLabel id="team-size-label">Team size</InputLabel>
        <Select
          sx={{ minWidth: 200, ml: 2 }}
          labelId="team-size-label"
          id="team-size"
          name="teamSize"
          color="secondary"
          onChange={handleChange}
          value={values.teamSize}
          error={Boolean(validationErrors.teamSize)}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          {generateDropDownFields(projectTeamSizeValues)}
        </Select>
      </Stack>
    </>
  );
};

export default ProjectSectionDropdowns;
