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

export default function Portfolios({
  portfolios,
}: {
  portfolios: Portfolio[];
}) {
  return (
    <Container component="div" maxWidth="md">
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Portfolios:
      </Typography>
      <List>
        {portfolios.map((portfolio, index) => {
          return (
            <>
              <ListItem button key={portfolio.id}>
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
            </>
          );
        })}
      </List>
    </Container>
  );
}

export async function getStaticProps() {
  let portfolios = [];
    const token = localStorage.getItem("token");
  // const token =
  //   "NA.iQ4uYK2nbE9enpJnvH1kVaSP4oW9Ymv2m4NmHlMLAU3rjM5EDQreJqMEOm7k";
  const headers = { Authorization: `Bearer ${token}` };
  const response = await fetch("http://127.0.0.1:3333/api/portfolios", {
    headers,
  });
  portfolios = await response.json();

  console.log(response);

  return {
    props: {
      portfolios,
    },
  };
}
