import Button from "@mui/material/Button";

export const ProjectSectionButtons = ({
  projectId,
  setNewProject,
}: {
  projectId: number | undefined;
  setNewProject: (arg0: boolean) => void;
}) => {
  const deleteNewProject = () => {
    setNewProject(false);
  };

  const deleteProject = () => {};
  if (!projectId) {
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
