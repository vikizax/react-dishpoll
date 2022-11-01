import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { ILayoutProps } from "./interface";
import AppBar from "./AppBar";

const RootStyle = styled("div")({
  minHeight: "100%",
  overflow: "hidden",
});

const Layout = () => {
  return (
    <Container maxWidth="md">
      <AppBar />
      <Outlet />
    </Container>
  );
};

export default Layout;
