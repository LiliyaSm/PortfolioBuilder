import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from "@/components/Link";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import { server } from "../config";
import { signIn, signOut, useSession } from "next-auth/react";
import theme from "@/src/themes/defaultTheme";

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
        <AppBar sx={{ minHeight: 85 }} position="fixed" color="secondary">
          <Toolbar sx={{ mt: 1.3 }}>
            <Link
              href={session?.user ? "/portfolios" : "/"}
              sx={{
                flexGrow: 1,
                cursor: "pointer",
                textTransform: "UpperCase",
              }}
            >
              Portfolio builder
            </Link>
            {session?.user ? (
              <div>
                <Button
                  sx={{ mr: 10 }}
                  variant="contained"
                  size="large"
                  onClick={createNewPortfolio}
                >
                  Create new portfolio
                </Button>
                {<span> Hello, {session?.user.name}!</span>}
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
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
              <Button variant="outlined" className="text-green-600" onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default MenuAppBar;
