import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import HighlightOff from "@mui/icons-material/HighlightOff";
import Stack from "@mui/material/Stack";
import { ISkills } from "../types";

const Skills = ({ defaultValue, name, setFunction }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const addNewSkill = () => {
    if (inputValue) {
      setFunction((prevValue: ISkills[]) => [
        ...prevValue,
        { type: name.toLowerCase(), value: inputValue },
      ]);
      setInputValue("");
    }
  };

  const deleteSkill = (valueToDelete: string) => {
    setFunction((prevValue: ISkills[]) => {
      return prevValue.filter(({ value }) => value !== valueToDelete);
    });
  };
  return (
    <>
      <List>
        <Stack direction="row" sx={{ flexWrap: "wrap" }}>
          {defaultValue.map(({ value }) => (
            <Stack
              key={value}
              direction="row"
              spacing={1}
              justifyContent="flex-start"
            >
              <ListItem sx={{ fontSize: "20px" }}>
                {value}{" "}
                <HighlightOff
                  sx={{ ml: 1 }}
                  onClick={() => deleteSkill(value)}
                />
              </ListItem>
            </Stack>
          ))}
        </Stack>
      </List>

      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <TextField
          sx={{ flexDirection: "row" }}
          color="secondary"
          label={name}
          multiline
          value={inputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
          }}
        ></TextField>
        <Button
          variant="contained"
          size="small"
          onClick={addNewSkill}
        >{`Add new`}</Button>
      </Stack>
    </>
  );
};

export default Skills;
