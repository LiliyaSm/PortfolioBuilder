import { server } from "../config";
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
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ProjectSection = (project: Project) => {
  const handleUpdatePortfolio = () => {};
  return (
    <Box
      component="form"
      onSubmit={handleUpdatePortfolio}
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
          id="outlined-required"
          label="project.clientName"
          defaultValue={project.clientName}
          name="projectName"
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
            id="outlined-required"
            label="Project clientName"
            defaultValue={project.clientName}
            name="clientName"
          />
          <TextField
            fullWidth
            color="secondary"
            id="outlined-required"
            label="Project clientIndustry"
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
          id="outlined-required"
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
          id="outlined-required"
          label="Project description"
          multiline
          rows={3}
          defaultValue={project.clientDescription}
          name="projectDescription"
        />
        <Button type="submit" sx={{ mr: 2 }} variant="contained" size="large">
          update project
        </Button>
        <Button type="submit" sx={{ mr: 10 }} variant="contained" size="large">
          delete project
        </Button>
      </>
    </Box>
  );
};

export default ProjectSection;
