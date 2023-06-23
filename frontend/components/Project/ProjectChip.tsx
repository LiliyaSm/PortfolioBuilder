import React from "react";
import Chip from "@mui/material/Chip";
import { Tooltip } from "@mui/material";

interface IProjectChip {
  title?: string;
  label: string;
}

const ProjectChip = ({ title, label }: IProjectChip) => {
  return (
    <Tooltip title={title}>
      <Chip sx={{ mt: -4, mb: 2, ml: 2 }} color="primary" label={label} />
    </Tooltip>
  );
};

export default ProjectChip;
