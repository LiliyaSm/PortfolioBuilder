import React, { useState } from "react";
import { server } from "../../../config";
import { Portfolio } from "@/types";
import {
  TextField,
  Box,
  Typography,
  Stack,
  Button,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Router from "next/router";
import ProjectSection from "@/components/ProjectSection";
import { createObjectFromForm, warningOnError } from "@/utils";
import AddIcon from "@mui/icons-material/Add";
import { GetServerSidePropsContext } from "next";
import Link from "@/components/Link";
import PreviewIcon from "@mui/icons-material/Preview";
import { useSession, getSession } from "next-auth/react";

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

const EditPortfolio = ({ portfolio }: { portfolio: Portfolio }) => {
  const [newProject, setNewProject] = useState<boolean>(false);

  const { data: session } = useSession();
  const token = session?.user?.token;

  const sortedProjects = portfolio.projects.sort((a, b) => {
    return new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf();
  });

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
      Router.push(`/portfolio/edit/${portfolio.id}`);
    }
  };

  const renderAddNewIcon = () => {
    if (newProject) {
      return (
        <Typography color="secondary">
          <h4>Save an existing project to add a new one</h4>
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
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">
          Edit the Portfolio: {portfolio.name}
        </Typography>
        <Tooltip title="Go to view">
          <Link
            sx={{ mr: 2, textDecoration: "none" }}
            href={`/portfolio/${portfolio.id}`}
          >
            <PreviewIcon color="secondary" />
          </Link>
        </Tooltip>
      </Stack>
      <hr />
      <Typography sx={{ my: 2, textAlign: "center" }} variant="h5"></Typography>
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
      {renderAddNewIcon()}
      <div>
        {newProject && (
          <ProjectSection
            project={{ portfolioId: portfolio.id }}
            setNewProject={setNewProject}
          />
        )}
        {sortedProjects.map((project) => (
          <ProjectSection
            key={project.id}
            project={project}
            setNewProject={setNewProject}
          />
        ))}
      </div>
    </ThemeProvider>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const session = await getSession({ req: context.req });
  const token = session?.user?.token;

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
      },
    };
  } else if (response.status == 401) {
    return { redirect: { destination: "/auth/login" } };
  }
}

export default EditPortfolio;
