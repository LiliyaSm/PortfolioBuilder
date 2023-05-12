import Nav from "./Nav";
// import Meta from './Meta'
import Container from "@mui/material/Container";

const Layout = ({ children }) => {
  return (
    <>
      {/* <Meta /> */}
      <Nav />
      <div>
        <Container sx={{ mt: 10 }} component="main" maxWidth="md">
          {children}
        </Container>
      </div>
    </>
  );
};

export default Layout;
