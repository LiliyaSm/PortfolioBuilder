import { server } from "../config";
import * as React from "react";
import { Project } from "../types";
import nextCookie from "next-cookies";
import { withAuthSync, redirectOnError, createObjectFromForm } from "../utils";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Router from "next/router";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from 'dayjs';

const ProjectSection = ({
  project,
  token,
}: {
  project: Project;
  token: string;
}) => {
  const [size, setSize] = React.useState<string>(project.size);
  // const [endDate, setEndDate] = React.useState<string | null>("");
  // const [startDate, setStartDate] = React.useState<string | null>("");

  const deleteProject = () => {};
  const handleSelectChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };
  const handleUpdateProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const apiUrl = `${server}/api/projects/${project.id}`;
    const object = createObjectFromForm(data);

    console.log(object);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(object),
    };

    const response = await fetch(apiUrl, requestOptions);
    console.log(response);

    if (response.ok) {
      Router.push(`/portfolio/${project.portfolioId}`);
    } else {
      const { error } = await response.json();
      console.log(error);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleUpdateProject}
      sx={{
        my: 8,
        px: 1,
        py: 2,
        border: "ridge 1px #9C27B0",
        borderRadius: "8px",
      }}
    >
      <>
        <TextField
          sx={{
            mb: 2,
          }}
          fullWidth
          color="secondary"
          id="clientName"
          label="Project client name"
          defaultValue={project.clientName}
          name="clientName"
        />
        <Stack
          sx={{
            mb: 2,
          }}
          direction="row"
          spacing={1}
        >
          <TextField
            fullWidth
            color="secondary"
            id="projectName"
            label="Project name"
            defaultValue={project.projectName}
            name="projectName"
          />
          <TextField
            fullWidth
            color="secondary"
            id="clientIndustry"
            label="Client industry"
            defaultValue={project.clientIndustry}
            name="clientIndustry"
          />
        </Stack>
        <TextField
          sx={{
            mb: 2,
          }}
          fullWidth
          color="secondary"
          id="clientDescription"
          label="Client description"
          multiline
          rows={2}
          defaultValue={project.clientDescription}
          name="clientDescription"
        />
        <TextField
          sx={{
            mb: 2,
          }}
          fullWidth
          color="secondary"
          id="projectDescription"
          label="Project description"
          multiline
          rows={3}
          defaultValue={project.clientDescription}
          name="projectDescription"
        />
        <Stack direction="row" justifyContent="space-around">
          <Box
            sx={{
              mb: 2,
            }}
          >
            <InputLabel id="size-label">Select size</InputLabel>
            <Select
              sx={{ minWidth: 140 }}
              labelId="size-label"
              id="size"
              name="size"
              required
              color="secondary"
              onChange={handleSelectChange}
              value={size}
            >
              <MenuItem value="Small">Small</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Large">Large</MenuItem>
            </Select>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                required
                name="startDate"
                label="Start date"
                defaultValue={dayjs(project.startDate)}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                required
                name="endDate"
                label="End date"
                defaultValue={dayjs(project.endDate)}
              />
            </LocalizationProvider>
          </Box>
        </Stack>
        <Button type="submit" sx={{ mr: 2 }} variant="contained" size="large">
          update project
        </Button>
        <Button
          onClick={deleteProject}
          sx={{ mr: 10 }}
          variant="contained"
          size="large"
        >
          delete project
        </Button>
      </>
    </Box>
  );
};

export default ProjectSection;
