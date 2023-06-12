import React from "react";
import { ValidationErrors, ISkills } from "@/types";
import MenuItem from "@mui/material/MenuItem";
import _ from "lodash";
import { GetServerSidePropsContext } from "next";

export const createObjectFromForm = (
  data: FormData
): { [key: string]: any } => {
  const object: { [key: string]: any } = {};
  data.forEach(
    (value: FormDataEntryValue, key: string) => (object[key] = value as string)
  );
  return object;
};

export const createErrors = (
  errors: { message: string; field: string }[]
): ValidationErrors => {
  const obj: {
    [key: string]: any;
  } = {};
  errors.forEach(({ message, field }: { message: string; field: string }) => {
    obj[field] = message;
  });
  return obj;
};

export const generateDropDownFields = (
  arr: { value: string; label: string }[]
) => {
  return arr.map(({ value, label }) => {
    return (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    );
  });
};

export const createSkillsList = (skills: ISkills[]) => {
  return _.chain(skills).groupBy("type").value();
};

export const redirectOnError = (context: GetServerSidePropsContext) => {}