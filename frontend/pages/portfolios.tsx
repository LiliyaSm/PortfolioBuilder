import Link from "../src/app/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Portfolio } from "../types";
import nextCookie from "next-cookies";
import { server } from "../config";
import Router from "next/router";
import { withAuthSync, redirectOnError } from "../utils/auth";

function Portfolios({ portfolios }: { portfolios: Portfolio[] }) {
  return (
    <Container component="div" maxWidth="md">
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Portfolios:
      </Typography>
      <List>
        {portfolios.map((portfolio, index) => {
          return (
            <div key={portfolio.id}>
              <ListItem button >
                <ListItemText>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    <Link
                      sx={{ mb: 2, color: "#9C27B0", textDecoration: "none" }}
                      href={`/portfolio/${portfolio.id}`}
                    >
                      {portfolio.name}
                    </Link>
                    <Chip sx={{ ml: 2 }} color="primary" label="Draft" />
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Created at:{new Date(portfolio.createdAt).toLocaleString()}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Updated at:{new Date(portfolio.updatedAt).toLocaleString()}
                  </Typography>
                </ListItemText>
                <Stack direction="row" spacing={1}>
                  <PreviewIcon />
                  <EditIcon />
                  <DeleteIcon />
                </Stack>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </Container>
  );
}

Portfolios.getInitialProps = async (ctx: { res?: any; req?: { headers: { cookie?: string | undefined; }; } | undefined; }) => {
  const { token } = nextCookie(ctx);
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
        portfolios,
      };
    } else {
      return await redirectOnError(ctx);
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError(ctx);
  }
};

export default withAuthSync(Portfolios);
