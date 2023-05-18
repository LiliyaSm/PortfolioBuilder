import Button from "@mui/material/Button";
import { server } from "../config";
import { Project } from "../types";
import Router from "next/router";

export const ProjectSectionButtons = ({
  project,
  setNewProject,
  token,
  setShowAlert
}: {
  project: Partial<Project>;
  setNewProject: (arg0: boolean) => void;
  token: string;
  setShowAlert:(arg0: string) => void;
}) => {
  const deleteNewProject = () => {
    setNewProject(false);
  };

  const deleteProject = async () => {
    const apiUrl = `${server}/api/projects/${project.id}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(apiUrl, requestOptions);
    if (response.ok) {
      Router.push(`/portfolio/edit/${project.portfolioId}`);
      setShowAlert("Deleted")
    }
  };

  if (!project.id) {
    return (
      <>
        <Button type="submit" sx={{ mr: 2 }} variant="contained" size="large">
          create project
        </Button>
        <Button
          onClick={deleteNewProject}
          sx={{ mr: 10 }}
          variant="contained"
          size="large"
        >
          delete project
        </Button>
      </>
    );
  } else {
    return (
      <>
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
    );
  }
};

export default ProjectSectionButtons;
