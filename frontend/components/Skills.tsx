import React, { useState } from "react";
import HighlightOff from "@mui/icons-material/HighlightOff";
import Stack from "@mui/material/Stack";
import { ISkills } from "../types";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

type SkillsProps = {
  defaultValue: ISkills[];
  name: string;
  setFunction: React.Dispatch<React.SetStateAction<ISkills[]>>;
  entities: string[];
};

const createMultiSelectValue = (defaultValue: ISkills[]): string[] => {
  return defaultValue.map(({ value }) => value);
};

const Skills = ({ defaultValue, name, setFunction, entities }: SkillsProps) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    const skills: ISkills[] = [];

    (value as string[]).forEach((el: string) => {
      const found = defaultValue.find(({ value }) => value === el);
      if (found) {
        skills.push(found);
      } else {
        skills.push({ type: name.toLowerCase(), value: el });
      }
    });
    console.log("skills", skills);
    setFunction(skills);
  };

  const deleteSkill = (_: any, valueToDelete: string) => {
    setFunction((prevValue: ISkills[]) => {
      return prevValue.filter(({ value }) => value !== valueToDelete);
    });
  };
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
      <FormControl sx={{ m: 1, width: "350px" }}>
        <InputLabel color="secondary" id={`multiple-chip-label-${name}`}>
          {name}
        </InputLabel>
        <Select
          labelId="multiple-chip-label"
          id={`multiple-chip-${name}`}
          fullWidth
          multiple
          color="secondary"
          value={createMultiSelectValue(defaultValue)}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={name} />}
          inputProps={{MenuProps: {disableScrollLock: true}}}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: string) => (
                <Chip
                  key={value}
                  label={value}
                  clickable
                  deleteIcon={
                    <HighlightOff
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                  onDelete={(e) => deleteSkill(e, value)}
                  onClick={() => console.log("clicked chip")}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {entities.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Skills;
