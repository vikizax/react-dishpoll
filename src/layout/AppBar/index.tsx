import { useState, useContext } from "react";
import { Avatar, Menu, MenuItem, Typography, Stack, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { APP_BAR_HEIGHT } from "../../constants";
import { AuthContext } from "../../context";
import { logoutHandler } from "../../db";

const Container = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: APP_BAR_HEIGHT,
});

const NameContainer = styled("div")({
  padding: "10px 18px",
});

const AppBar = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    logoutHandler();
    setAuth({ authenticated: false, username: "", authenticating: false });
    setAnchorEl(null);
  };

  const handleRouteChange = (route: string) => {
    if (pathname === route) return;
    navigate(route);
  };
  return (
    <Container>
      <Stack flexDirection={"row"} gap={4}>
        <Link
          component="button"
          variant="body2"
          onClick={() => handleRouteChange("/")}
          underline={pathname === "/" ? "always" : "none"}
        >
          Home
        </Link>

        <Link
          component="button"
          variant="body2"
          onClick={() => handleRouteChange("/leaderboard")}
          underline={pathname === "/leaderboard" ? "always" : "none"}
        >
          Leaderboard
        </Link>
      </Stack>

      <Avatar
        alt="avatar"
        src="https://joeschmoe.io/api/v1/random"
        onClick={handleClick}
      />

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-menu",
        }}
      >
        <NameContainer>
          <Typography variant="body1" fontWeight={"bold"}>
            {auth.username}
          </Typography>
        </NameContainer>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Container>
  );
};

export default AppBar;
