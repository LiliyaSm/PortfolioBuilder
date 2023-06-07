/* eslint-disable react/no-unescaped-entities */
import Link from "../src/app/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Portfolio } from "../types";
import { server } from "../config";
import Router from "next/router";
import { withAuthSync, redirectOnError } from "../utils";
import { GetServerSidePropsContext } from "next";

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
    <Container component="div" maxWidth="md">
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Portfolios:
      </Typography>
      <List>
        {sortedPortfolios.map((portfolio) => {
          return (
            <div key={portfolio.id}>
              <ListItem button>
                <ListItemText>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    <Link
                      sx={{ mb: 2, color: "#9C27B0", textDecoration: "none" }}
                      href={`/portfolio/edit/${portfolio.id}`}
                    >
                      {portfolio.name}
                    </Link>
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Created at:{new Date(portfolio.createdAt).toLocaleString()}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Updated at:{new Date(portfolio.updatedAt).toLocaleString()}
                  </Typography>
                </ListItemText>
                <Stack direction="row" spacing={1}>
                  <Link
                    sx={{ mb: 2, textDecoration: "none" }}
                    href={`/portfolio/${portfolio.id}`}
                  >
                    <PreviewIcon color="secondary" />
                  </Link>
                  <Link
                    sx={{ mb: 2, color: "#9C27B0", textDecoration: "none" }}
                    href={`/portfolio/edit/${portfolio.id}`}
                  >
                    <EditIcon color="secondary" />
                  </Link>
                  <DeleteIcon
                    color="secondary"
                    onClick={() => deletePortfolio(portfolio.id)}
                  />
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
  const token = context.req.cookies["token"];
  const apiUrl = `${server}/api/portfolios`;

  try {
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
      return Router.push("/login");
    }
    return redirectOnError(context);
  } catch (error) {
    // Implementation or Network error
    return redirectOnError(context);
  }
}

export default withAuthSync(Portfolios);
