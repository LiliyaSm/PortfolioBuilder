/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Link from "../components/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import { Tooltip, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Portfolio } from "../types";
import { server } from "../config";
import Router from "next/router";
import { displayToastSuccess } from "@/utils";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { darkGrey } from "@/constants";

const Portfolios = ({
  portfolios,
  token,
}: {
  portfolios: Portfolio[];
  token: string;
}): React.ReactElement => {
  const sortedPortfolios = portfolios.sort((a, b) => {
    return new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf();
  });
  const deletePortfolio = async (id: number) => {
    const apiUrl = `${server}/api/portfolios/${id}`;

    const response = await fetch(apiUrl, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      displayToastSuccess("Portfolio successfully deleted");
      Router.push("/portfolios");
    }
  };

  if (!portfolios || !portfolios.length) {
    return (
      <Container component="div" maxWidth="md">
        <Typography sx={{ textAlign: "center" }} variant="h3">
          You don't have any portfolios yet
        </Typography>
      </Container>
    );
  }
  return (
      <Container
        component="div"
        maxWidth="lg"
        sx={{ backgroundColor: "white", py: 3, borderRadius: "14px" }}
      >
        {/* <Typography sx={{ textAlign: "center" }} variant="h3">
          Portfolios:
        </Typography> */}
        <List>
          {sortedPortfolios.map((portfolio) => {
            return (
              <div key={portfolio.id}>
                <ListItem button>
                  <ListItemText>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      <Link
                        sx={{
                          mb: 2,
                          color: "text.primary",
                          textDecoration: "none",
                        }}
                        href={`/portfolio/edit/${portfolio.id}`}
                      >
                        {portfolio.name}
                      </Link>
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Created at:{" "}
                      {new Date(portfolio.createdAt).toLocaleString()}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Updated at:{" "}
                      {new Date(portfolio.updatedAt).toLocaleString()}
                    </Typography>
                  </ListItemText>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Preview portfolio">
                      <Link
                        sx={{ mb: 2, textDecoration: "none" }}
                        href={`/portfolio/${portfolio.id}`}
                      >
                        <PreviewIcon color="primary" />
                      </Link>
                    </Tooltip>
                    <Link
                      sx={{ mb: 2, color: darkGrey, textDecoration: "none" }}
                      href={`/portfolio/edit/${portfolio.id}`}
                    >
                      <Tooltip title="Edit portfolio">
                        <EditIcon color="primary" />
                      </Tooltip>
                    </Link>
                    <Tooltip title="Delete portfolio">
                      <DeleteIcon
                        color="primary"
                        onClick={() => deletePortfolio(portfolio.id)}
                      />
                    </Tooltip>
                  </Stack>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apiUrl = `${server}/api/portfolios`;

  const session = await getSession({ req: context.req });
  const token = session?.user?.token;

  const response = await fetch(apiUrl, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const portfolios = await response.json();
    return {
      props: {
        portfolios,
        token,
      },
    };
  } else if (response.status == 401) {
    return { redirect: { destination: "/auth/login" } };
  }
}

export default Portfolios;
