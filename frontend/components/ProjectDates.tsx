import React, { useState, useEffect, ChangeEvent } from "react";
import { Project, ValidationErrors, ISkills } from "../types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const ProjectDates = ({
  validationErrors,
  project,
}: {
  project: Project;
  validationErrors: ValidationErrors;
}) => {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState<boolean>(
    !Boolean(project.endDate)
  );
  return (
    <Stack
      sx={{ mb: 2 }}
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            required
            name="startDate"
            label="Start date"
            color="secondary"
            defaultValue={dayjs(project.startDate) || ""}
            helperText={validationErrors.startDate ?? " "}
            sx={{ minWidth: 140 }}
            format="YYYY-MM-DD"
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            required={!isCurrentlyWorking}
            disabled={isCurrentlyWorking}
            color="secondary"
            name="endDate"
            label={!isCurrentlyWorking ? "End date" : ""}
            defaultValue={dayjs(project.endDate) ?? ""}
            helperText={validationErrors.endDate ?? " "}
            format="YYYY-MM-DD"
            sx={{ minWidth: 140, ml: 3 }}
          />
        </LocalizationProvider>
      </Box>
      <FormControlLabel
        sx={{ ml: 2, mb: 2 }}
        control={
          <Checkbox
            name="isCurrentlyWorking"
            checked={isCurrentlyWorking}
            onChange={(
              event: ChangeEvent<HTMLInputElement>,
              checked: boolean
            ) => setIsCurrentlyWorking(checked)}
          />
        }
        label="I am currently working in this role"
      />
    </Stack>
  );
};

export default ProjectDates;