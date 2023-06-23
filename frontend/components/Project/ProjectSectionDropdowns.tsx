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
  const [size, setSize] = useState<string>(project.size || "");
  const [cloud, setCloud] = useState<string>(project.cloud || "");
  const [role, setRole] = useState<string>(project.role || "");
  const [teamSize, setTeamSize] = useState<string>(project.teamSize || "");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };

  const handleSelectCloudChange = (event: SelectChangeEvent) => {
    setCloud(event.target.value as string);
  };

  const handleSelectTeamSizeChange = (event: SelectChangeEvent) => {
    setTeamSize(event.target.value as string);
  };

  const handleSelectRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
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
          onChange={handleSelectRoleChange}
          value={role}
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
          onChange={handleSelectChange}
          value={size}
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
          onChange={handleSelectCloudChange}
          value={cloud}
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
          onChange={handleSelectTeamSizeChange}
          value={teamSize}
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
