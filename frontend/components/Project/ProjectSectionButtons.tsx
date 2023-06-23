import React from "react";
import Button from "@mui/material/Button";
import { server } from "@/config";
import { Project } from "@/types";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { displayToastSuccess } from "@/utils";

export const ProjectSectionButtons = ({
  project,
  setNewProject,
  isLoading = false,
}: {
  project: Partial<Project>;
  setNewProject: (arg0: boolean) => void;
  isLoading: boolean;
}) => {
  const deleteNewProject = () => {
    setNewProject(false);
  };

  const router = useRouter();

  const { data: session } = useSession();
  const token = session?.user?.token;

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
      router.push(`/portfolio/edit/${project.portfolioId}`);
      displayToastSuccess("Deleted");
    }
  };

  const onClickDelete = project.id ? deleteProject : deleteNewProject;
  const buttonText = project.id ? "update project" : "create project";

  return (
    <>
      <Button
        type="submit"
        sx={{ mr: 2, minWidth: "173px" }}
        variant="contained"
        size="large"
      >
        {isLoading ? "Loading..." : buttonText}
      </Button>
      <Button
        onClick={onClickDelete}
        variant="contained"
        size="large"
      >
        delete project
      </Button>
    </>
  );
};

export default ProjectSectionButtons;
