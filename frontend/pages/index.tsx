"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { Inter } from "@next/font/google";
import { useState } from "react";
import theme from "@/src/themes/defaultDarkTheme";
import { ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
  Box,
  CssBaseline,
  LinearProgress,
  CircularProgress,
  Skeleton,
  Pagination,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Container,
} from "@mui/material";
// import { getPublicTrees } from "@/utils/api";
// import MapSection from "@/components/MapSection";
import LandingLayout from "@/components/LandingLayout";
import { motion } from "framer-motion";
// import Sidebar from "@/components/Topbar";
import Link from "next/link";
// import Carousel from "react-material-ui-carousel";
// const inter = Inter({ subsets: ["latin"] });
import { lightGrey, main, dark, HEADER_HEIGHT } from "@/constants";

const instructionsList = [
  "add your project to your work portfolio",
  "save as draft and work with it later",
  "save as draft and work with it later",
];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

          // paddingTop: `${HEADER_HEIGHT}px`,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            alignContent="center"
            justifyContent="center"
            flexDirection="row"
          >
            <Stack
              color="text.primary"
              justifyContent="center"
              alignContent="left"
              gap="24px"
            >
              <Typography sx={{ fontSize: "60px" }}>
                <b>Create your ideal portfolio today</b>
              </Typography>
              <Typography sx={{ fontSize: "18px" }}>
                Join over 14,000 learners gaining{" "}
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
            <Box sx={{ display: "flex", width: 1050, mx: 2, py: 10 }}>
              <Box
                sx={{
                  color: "black",
                  flex: 1,
                  justifyContent: "start",
                  alignContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Image
                  src={"/tree.png"}
                  height={370}
                  width={260}
                  alt="diagram"
                />
              </Box>
            </Box>
          </Stack>
        </Container>
        <Stack
          sx={{
            height: "340px",
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
              "&:hover p": { color: "#000" },
              color: "#8892a7",
              transition: "color 1s",
            }}
          >
            <Typography
              align="center"
              sx={{
                mb: 4,
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
              <Typography align="center">
                10 <br /> active users
              </Typography>
              <Typography align="center">
                10 <br /> portfolios
              </Typography>
              <Typography align="center">
                10 <br /> projects added
              </Typography>
              <Typography align="center">
                100% <br /> happy users
              </Typography>
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
