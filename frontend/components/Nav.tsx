import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@/components/Link";
import { IconButton, Container, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { AccountCircle } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import { server } from "@/config";
import { signIn, signOut, useSession } from "next-auth/react";
import theme from "@/src/themes/defaultTheme";
import { HEADER_HEIGHT, main } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const MenuAppBar = (): React.ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { data: session } = useSession();
  const token = session?.user?.token;

  const router = useRouter();

  const createNewPortfolio = async () => {
    const apiUrl = `${server}/api/portfolios`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(apiUrl, requestOptions);
    const portfolio = await response.json();
    if (response.ok) {
      router.push(`/portfolio/edit/${portfolio.id}`);
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, mb: 18 }}>
        <AppBar
          sx={{ minHeight: HEADER_HEIGHT, backgroundColor: "white" }}
          position="fixed"
        >
          <Container component="div" maxWidth="lg">
            <Toolbar sx={{ mt: 1.3 }}>
              <Link
                href={session?.user ? "/portfolios" : "/"}
                sx={{
                  flexGrow: 1,
                  cursor: "pointer",
                  textTransform: "UpperCase",
                }}
              >
                <Box
                  sx={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    backgroundColor: main,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    size="lg"
                    inverse
                    icon={icon({ name: "briefcase" })}
                  />
                </Box>
              </Link>
              {session?.user ? (
                <div>
                  <Button
                    sx={{ mr: 5 }}
                    variant="contained"
                    size="large"
                    onClick={createNewPortfolio}
                  >
                    Create new portfolio
                  </Button>
                  {
                    <Box component="span" sx={{ color: "text.primary" }}>
                      Hello, {session?.user.name}!
                    </Box>
                  }
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    sx={{ ml: 2 }}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    disableScrollLock
                  >
                    <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                      Log out
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  variant="outlined"
                  className="text-green-600"
                  onClick={() => signIn()}
                >
                  Sign In
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default MenuAppBar;
