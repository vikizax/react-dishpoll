import { useState } from "react";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { APP_BAR_HEIGHT } from "../../style-constants";

const Container = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  alignItems: "center",
  minHeight: APP_BAR_HEIGHT,
});

const NameContainer = styled("div")({
  padding: "10px 18px",
});

const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container>
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
            John Smith
          </Typography>
        </NameContainer>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Container>
  );
};

export default AppBar;
