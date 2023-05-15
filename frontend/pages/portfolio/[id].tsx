import React, { useState } from "react";
import { server } from "../../config";
import { Portfolio } from "../../types";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { createObjectFromForm } from "../../utils";
import Router from "next/router";
import ProjectSection from "../../components/ProjectSection";
import { withAuthSync, redirectOnError } from "../../utils";
import AddIcon from "@mui/icons-material/Add";

const theme = createTheme({
  palette: {
    secondary: {
      main: purple[500],
    },
    primary: {
      light: "#faf9bb",
      main: "#fdee00",
      dark: "#f7f402",
      contrastText: "#9C27B0",
    },
  },
});

export default function Portfolios({
  portfolio,
  token,
}: {
  portfolio: Portfolio;
  token: string;
}) {
  const [newProject, setNewProject] = useState<boolean>(false);

  const handleSubmitPortfolio = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const object = createObjectFromForm(data);

    const apiUrl = `${server}/api/portfolios/${portfolio.id}`;

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
      Router.push(`/portfolio/${portfolio.id}`);
    }
  };

  const renderAddNewIcon = () => {
    if (newProject) {
      return (
        <Typography color="secondary">
          <h4>Save existing project to add a new one</h4>
        </Typography>
      );
    } else {
      return (
        <Stack
          onClick={createNewProject}
          direction="row"
          sx={{ cursor: "pointer" }}
        >
          <AddIcon />
          <Typography>Add new project</Typography>
        </Stack>
      );
    }
  };

  const createNewProject = () => setNewProject(true);

  return (
    <ThemeProvider theme={theme}>
      <h2>Edit the Portfolio: {portfolio.name}</h2>
      <hr />
      <Typography sx={{ my: 2, textAlign: "center" }} variant="h5"></Typography>
      {/* <Typography>Portfolio name</Typography> */}
      <Box
        component="form"
        onSubmit={handleSubmitPortfolio}
        noValidate
        sx={{ mt: 1, mb: 2 }}
      >
        <TextField
          fullWidth
          required
          color="secondary"
          id="outlined-required"
          label="Portfolio name"
          name="name"
          defaultValue={portfolio.name}
          sx={{
            mb: 2,
          }}
        />
        <Button type="submit" sx={{ mr: 10 }} variant="contained" size="large">
          update name
        </Button>
      </Box>
      <div>{/* <p>{post.content}</p> */}</div>
      {renderAddNewIcon()}
      <div>
        {newProject && (
          <ProjectSection
            token={token}
            project={{ portfolioId: portfolio.id }}
            setNewProject={setNewProject}
          />
        )}
        {portfolio.projects.map((project) => (
          <ProjectSection
            key={project.id}
            token={token}
            project={project}
            setNewProject={setNewProject}
          />
        ))}
      </div>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const token = context.req.cookies["token"];
  const apiUrl = `${server}/api/portfolios/${id}`;

  const headers = { Authorization: `Bearer ${token}` };
  const response = await fetch(apiUrl, {
    headers,
  });

  if (response.ok) {
    const portfolio = await response.json();
    return {
      props: {
        portfolio,
        token,
      },
    };
  } else {
    return await redirectOnError(context);
  }
}