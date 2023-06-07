import React, { useState, useEffect, ChangeEvent } from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Portfolio } from "../../types";
import { server } from "../../config";
import { withAuthSync, redirectOnError, createSkillsList } from "../../utils";
import { GetServerSidePropsContext } from "next";
import { roles } from "../../constants";
import upperFirst from "lodash/capitalize";

const dateOptions = {
  year: "numeric",
  month: "2-digit",
  day: "numeric",
} as const;

const View = ({ portfolio, token }: { portfolio: Portfolio; token: string }): React.ReactElement => {
  const [firstName, setFirstName] = useState<string | null>("");
  const [lastName, setLastName] = useState<string | null>("");

  useEffect(() => {
    setFirstName(localStorage.getItem("firstName"));
    setLastName(localStorage.getItem("lastName"));
  }, []);
  const sortedProjects = portfolio.projects.sort((a, b) => {
    return new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf();
  });
  return (
    <Container component="div" maxWidth="md">
      <Typography variant="h4">
        {firstName} {lastName}
      </Typography>
      <Divider />
      {sortedProjects.map((project) => {
        const skillsList = createSkillsList(project.skills);
        const role = roles.find(({ value }) => value === project.role);
        return (
          !project.isDraft && (
            <Box key={project.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 3 }}
              >
                <Typography sx={{ textAlign: "left" }} variant="h6">
                  {role && role.label.toUpperCase()}
                </Typography>
                <Typography sx={{ textAlign: "center" }} variant="subtitle1">
                  {new Date(project.startDate).toLocaleDateString(
                    "en",
                    dateOptions
                  )}{" "}
                  -{" "}
                  {project.endDate
                    ? new Date(project.endDate).toLocaleDateString(
                        "en",
                        dateOptions
                      )
                    : "Till now"}
                </Typography>
              </Stack>
              <Box key={project.id}>
                <Typography sx={{ mt: 1.5 }} variant="h4">
                  <i>{project.clientName}</i>
                </Typography>
                <Box sx={{ mt: 0.5, fontSize: "18px" }}>
                  Industry: {project.clientIndustry}
                </Box>
                {project.clientDescription && (
                  <Box key={project.id} sx={{ mt: 0.5, color: "#2F4F4F" }}>
                    {project.clientDescription}
                  </Box>
                )}
              </Box>
              <Box sx={{ textAlign: "justify" }}>
                <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
                  {project.projectName}
                </Typography>
                {project.projectDescription}
              </Box>
              <Box sx={{ mt: 0.7 }}>
                {`Project type: ${project.projectType};   Project size:
                ${project.size};   Team size: ${project.teamSize};   Cloud: 
                ${project.cloud}`}
              </Box>
              <Box sx={{ textAlign: "justify" }}>
                <Typography sx={{ mt: 3 }} variant="h5">
                  Actions
                </Typography>
                {project.actions}
              </Box>
              <Box sx={{ textAlign: "justify" }}>
                <Typography sx={{ mt: 3 }} variant="h5">
                  Outcome
                </Typography>
                {project.outcome}
              </Box>
              <Typography sx={{ mt: 3 }} variant="h5">
                Skills
              </Typography>
              {Object.keys(skillsList).map((key) => {
                return (
                  <Box sx={{ mb: 1 }} key={key}>
                    <Typography variant="subtitle1">
                      {upperFirst(`${key}s`)}:
                    </Typography>
                    {skillsList[key].map(({ value }) => {
                      return (
                        <ListItem
                          sx={{ display: "list-item", pt: 0.2, pb: 0.2 }}
                          key={value}
                        >
                          {value}
                        </ListItem>
                      );
                    })}
                  </Box>
                );
              })}
              <Divider sx={{ pt: 2, pb: 0.2 }} />
            </Box>
          )
        );
      })}
      <List></List>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const token = context.req.cookies["token"];
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
        token,
      },
    };
  } else {
    return await redirectOnError(context);
  }
}

export default withAuthSync(View);
