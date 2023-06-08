import React from "react";
import Button from "@mui/material/Button";
import { server } from "../config";
import { Project } from "../types";
import Router from "next/router";

export const ProjectSectionButtons = ({
  project,
  setNewProject,
  token,
  setShowAlert,
}: {
  project: Partial<Project>;
  setNewProject: (arg0: boolean) => void;
  token: string;
  setShowAlert: (arg0: string) => void;
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
      setShowAlert("Deleted");
    }
  };

  const onClickDelete = project.id ? deleteProject : deleteNewProject;
  const buttonText = project.id ? "update project" : "create project";

  return (
    <>
      <Button type="submit" sx={{ mr: 2 }} variant="contained" size="large">
        {buttonText}
      </Button>
      <Button
        onClick={onClickDelete}
        sx={{ mr: 10 }}
        variant="contained"
        size="large"
      >
        delete project
      </Button>
    </>
  );
};

export default ProjectSectionButtons;
