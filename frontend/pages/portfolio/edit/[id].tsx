import React, { useState } from "react";
import { server } from "@/config";
import { Portfolio } from "@/types";
import {
  TextField,
  Box,
  Typography,
  Stack,
  Button,
  Tooltip,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ProjectSection from "@/components/ProjectSection";
import { displayToastSuccess } from "@/utils";
import AddIcon from "@mui/icons-material/Add";
import { GetServerSidePropsContext } from "next";
import Link from "@/components/Link";
import PreviewIcon from "@mui/icons-material/Preview";
import { useSession, getSession } from "next-auth/react";
import theme from "@/src/themes/defaultTheme";

const EditPortfolio = ({ portfolio }: { portfolio: Portfolio }) => {
  const [newProject, setNewProject] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: session } = useSession();
  const token = session?.user?.token;

  const sortedProjects = portfolio.projects.sort((a, b) => {
    return new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf();
  });

  const handleSubmitPortfolio = async () => {
    if(isLoading) return;
    setIsLoading(true);
    const apiUrl = `${server}/api/portfolios/${portfolio.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        displayToastSuccess("name successfully updated");
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const renderAddNewIcon = () => {
    return (
      <Tooltip
        title={newProject && "Save an existing project to add a new one"}
      >
        <span>
          <Button
            disabled={newProject}
            variant="contained"
            size="large"
            onClick={createNewProject}
          >
            <AddIcon />
            Add new project
          </Button>
        </span>
      </Tooltip>
    );
  };

  const createNewProject = () => {
    setNewProject(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "white", p: 2, borderRadius: "14px" }}>
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
        <Typography
          sx={{ my: 2, textAlign: "center" }}
          variant="h5"
        ></Typography>
        <Box component="div" sx={{ mt: 1, mb: 2 }}>
          <TextField
            fullWidth
            required
            color="secondary"
            id="outlined-required"
            label="Portfolio name"
            name="name"
            defaultValue={portfolio.name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mb: 2,
            }}
          />
          <Button
            sx={{ mr: 3, minWidth: "173px" }}
            onClick={handleSubmitPortfolio}
            variant="contained"
            size="large"
          >
            {isLoading ? "Loading..." : "update name"}
          </Button>
          {renderAddNewIcon()}
        </Box>
      </Box>
      <div>
        {newProject && (
          <ProjectSection
            project={{ portfolioId: portfolio.id }}
            setNewProject={setNewProject}
            isNewProject
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
