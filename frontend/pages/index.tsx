/* eslint-disable react/jsx-key */
"use client";
import React, { useState } from "react";
import PieChart from "@/components/PieChart";
import theme from "@/src/themes/defaultDarkTheme";
import { ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/List";
import { Box, Typography, Stack, Container, Button } from "@mui/material";
import LandingLayout from "@/components/LandingLayout";
import { light, HEADER_HEIGHT } from "@/constants";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IGeneralStatistics, ISkillsStatistics, IStatistics } from "@/types";
import { GetServerSidePropsContext } from "next";
import { server } from "@/config";

const dataList = ["Languages", "Frameworks", "Tools"];

const statisticsItems = [
  { data: "users", text: "active users" },
  { data: "portfolios", text: "portfolios" },
  { data: "projects", text: "projects added" },
  { data: "happiness", text: "happy users" },
];

export default function Home({
  statisticsData,
}: {
  statisticsData: IStatistics;
}) {
  const [dataId, setDataId] = useState("languages");

  const generalData = statisticsData as IGeneralStatistics;
  const skills = statisticsData.skills;

  const isSmallScreen = useMediaQuery("(max-width:1200px)");


  const instructionsList = [
    <span>Add project to your portfolio</span>,
    <span>
      Enhance with <span style={{ color: light }}> AI technology</span>
    </span>,
    <span>Save as draft for later</span>,
    <span>Save or print as PDF</span>,
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "background.default",
          flexDirection: "column",
          height: isSmallScreen ? "auto" : "100vh",
          display: "flex",
          justifyContent: "space-evenly",
          paddingTop: `${HEADER_HEIGHT}px`,
          px: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            alignContent="center"
            flexDirection={isSmallScreen ? "column" : "row"}
          >
            <Stack
              color="text.primary"
              justifyContent={"center"}
              sx={{ mx: isSmallScreen ? "auto" : 0 }}
              gap="24px"
              maxWidth="490px"
            >
              <Typography sx={{ fontSize: isSmallScreen ? "30px" : "60px" }}>
                <b>Create your ideal portfolio today</b>
              </Typography>
              <Typography sx={{ fontSize: "18px" }}>
                Create your working portfolio simply and easily{" "}
              </Typography>
              <List sx={{ listStyleType: "disc", lineHeight: 1 }}>
                {instructionsList.map((instruction, i) => {
                  return (
                    <li
                      key={i}
                      style={{
                        marginBottom: "10px",
                        marginLeft: "0",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "10px",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </span>
                      {instruction}
                    </li>
                  );
                })}
              </List>
            </Stack>
            <Box
              sx={{
                display: "flex",
                mx: 2,
                pt: 10,
                pb: 5,
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Box>
                <PieChart
                  data={skills[dataId as keyof ISkillsStatistics]}
                  text={`Our users know these ${dataId} best`}
                />
                <Stack
                  direction="row"
                  sx={{ justifyContent: "space-evenly", mt: 6 }}
                >
                  {dataList.map((el) => {
                    const isActive = el.toLocaleLowerCase() === dataId;
                    return (
                      <Button
                        key={el}
                        onClick={() => setDataId(el.toLocaleLowerCase())}
                        sx={{
                          width: "120px",
                          "&:hover": {
                            backgroundColor: "background.paper",
                            transform: isActive ? "" : "translateY(3px)",
                            boxShadow:
                              "inset 0px 10px 20px 2px rgba(0, 0, 0, 0.25)",
                          },
                          boxShadow: isActive
                            ? `inset 0px 5px 5px 0px rgba(0, 0, 0, 0.5)`
                            : `0px 5px 5px 0px rgba(0, 0, 0, 0.5)`,
                          backgroundColor: "background.paper",
                        }}
                      >
                        <b>{el}</b>
                      </Button>
                    );
                  })}
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Container>
        <Stack
          sx={{
            height: "250px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            align="center"
            color="text.primary"
            sx={{
              mb: 2,
              fontSize: "24px",
            }}
          >
            {"Statistics".toUpperCase()}
          </Typography>
          <Box
            sx={{
              width: isSmallScreen ? "100%" : "80%",
              cursor: "pointer",
              backgroundColor: "background.paper",
              px: 4,
              py: 2,
              borderRadius: "14px",
              boxShadow: `0px 5px 10px 0px rgba(0, 0, 0, 0.5)`,
              "&: hover p": {
                scale: "1.1",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
              flexDirection="row"
            >
              {statisticsItems.map(
                ({ data, text }: { data: string; text: string }) => {
                  return (
                    <Typography
                      key={text}
                      sx={{ transition: "all 0.2s ease-in", mx: 1 }}
                      align="center"
                      color="text.secondary"
                    >
                      <b>
                        <span style={{ fontSize: "20px" }}>
                          {generalData[data as keyof IGeneralStatistics]}{" "}
                        </span>
                        <br /> {text}
                      </b>
                    </Typography>
                  );
                }
              )}
            </Box>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <LandingLayout>{page}</LandingLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apiUrl = `${server}/api/statistics`;

  const response = await fetch(apiUrl);

  const statisticsData = await response.json();
  console.log()
  return {
    props: {
      statisticsData,
    },
  };
}
