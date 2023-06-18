"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import PieChart from "@/components/PieChart";
import theme from "@/src/themes/defaultDarkTheme";
import { ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/List";
import { Box, Typography, Stack, Container, Button } from "@mui/material";
import LandingLayout from "@/components/LandingLayout";
import { lightGrey, main, dark, HEADER_HEIGHT } from "@/constants";
import { useSelector } from "react-redux";
import { selectStatisticsData } from "@/store/statisticsSlice";
import { Box3Helper } from "three";

const instructionsList = [
  "add your project to your work portfolio",
  "enhance using artificial intelligence",
  "save as draft and work with it later",
];

const dataList = ["Languages", "Frameworks", "Tools"];
const statistics = {
  users: 10,
  portfolios: 10,
  projects: 20,
  happiness: "100%",
};
const statisticsItems = [
  { data: "users", text: "active users" },
  { data: "portfolios", text: "portfolios" },
  { data: "projects", text: "projects added" },
  { data: "happiness", text: "happy users" },
];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataId, setDataId] = useState("languages");
  const statisticsData = useSelector(selectStatisticsData);

  useEffect(() => {
    // setLoading(true);
  }, []);

  // if (loading) {
  //   return (
  //     <Box
  //       sx={{
  //         background: "#00000017",
  //         display: "flex",
  //         width: "100vw",
  //         height: "100vh",
  //         position: "absolute",
  //         top: 0,
  //         left: 0,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         flexDirection: "column",
  //       }}
  //     >
  //       <motion.div
  //         animate={{
  //           scale: [2, 1, 2, 1, 1],
  //           rotate: [0, 360, 180, 180, 360],
  //           borderRadius: ["0%", "0%", "50%", "50%", "0%"],
  //         }}
  //         transition={{
  //           duration: 3,
  //           ease: "easeInOut",
  //           times: [0, 0.2, 0.5, 0.8, 1],
  //           repeat: Infinity,
  //           repeatDelay: 1,
  //         }}
  //       >
  //       </motion.div>
  //     </Box>
  //   );
  // }
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#31aab7",
          flexDirection: "column",
          height: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "space-evenly",

          paddingTop: `${HEADER_HEIGHT}px`,
          px: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack alignContent="center" flexDirection="row">
            <Stack
              color="text.primary"
              justifyContent="center"
              gap="24px"
              maxWidth="490px"
            >
              <Typography sx={{ fontSize: "60px" }}>
                <b>Create your ideal portfolio today</b>
              </Typography>
              <Typography sx={{ fontSize: "18px" }}>
                Create your working portfolio simply and easily{" "}
                <Box component="span" sx={{ color: main }}>
                  skills of the future!
                </Box>
              </Typography>
              <List sx={{ listStyleType: "disc", lineHeight: 1 }}>
                {instructionsList.map((instruction) => {
                  return (
                    <li
                      key={instruction}
                      style={{
                        marginBottom: "10px",
                        marginLeft: "0",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          // color: dark,
                          marginRight: "10px",
                          fontSize: "20px",
                          fontWeight: "bold",
                          verticalAlign: "middle",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          font: "Inter",
                          verticalAlign: "middle",
                        }}
                      >
                        {instruction}
                      </span>
                    </li>
                  );
                })}
              </List>
            </Stack>
            <Box
              sx={{
                display: "flex",
                mx: 2,
                py: 10,
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              {/* <Image src={"/tree.png"} height={370} width={260} alt="diagram" /> */}
              <Box>
                <PieChart
                  data={statisticsData[dataId]}
                  text={`Our most popular ${dataId}`}
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
                          color: isActive ? "#000" : `#31aab7`,
                          "&:hover": {
                            backgroundColor: "#FFF",
                            transform: isActive ? "" : "translateY(3px)",
                            boxShadow:
                              "inset 0px 10px 20px 2px rgba(0, 0, 0, 0.25)",
                          },
                          boxShadow: isActive
                            ? `inset 0px 5px 10px 0px rgba(0, 0, 0, 0.5)`
                            : `0px 5px 10px 0px rgba(0, 0, 0, 0.5)`,
                          backgroundColor: "#fff",
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
            background:
              "radial-gradient(46.7% 50% at 50% 50%,#fff 0%, #31aab7 100%)",
          }}
        >
          <Box
            sx={{
              width: "80%",
              cursor: "pointer",
              backgroundColor: "#fff",
              boxShadow:
                "rgba(255, 255, 255, 0.05) 0px 2px 0px 0px inset, rgba(255, 255, 255, 0.03) 0px -2px 0px 0px inset",
              px: 4,
              py: 2,
              borderRadius: "14px",
              "&:hover p, &:hover h5": {
                color: "black",
              },
              p: {
                color: "grey",
                // transition: "all 2s",
              },
            }}
          >
            <Typography
              align="center"
              variant="h5"
              sx={{
                mb: 2,
                color: "grey",
                transition: "all 0.3s",
              }}
            >
              <b>Our statistics</b>
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
              flexDirection="row"
            >
              {statisticsItems.map(({ data, text }) => {
                return(
                  <Typography
                    sx={{ transition: "all 0.3s ease-in" }}
                    align="center"
                  >
                    <b>
                      {statistics[data]} <br /> {text}
                    </b>
                  </Typography>
                );
              })}
            </Box>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

Home.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });

//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: "/",
//   //       permanent: false,
//   //     },
//   //   };
//   // }
//   return {
//     props: { data: session },
//   };
// }
