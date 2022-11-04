import { useContext, useState } from "react";
import { AccountCircle, Lock } from "@mui/icons-material";
import {
  Stack,
  Container,
  TextField,
  InputAdornment,
  Avatar,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import { ISnackData } from "../Leaderboard/UserSubmissionRank/interface";
import { userLoginHandler } from "../../db";
import { AuthContext } from "../../context";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalid, setInvalid] = useState<{
    username: boolean;
    password: boolean;
  }>({
    username: false,
    password: false,
  });

  const [snackData, setSnackData] = useState<ISnackData>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSnackClose = () => {
    setSnackData((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = () => {
    setInvalid({ password: false, username: false });
    const { authenticated, username: u_name } = userLoginHandler({
      username,
      password,
    });
    if (!authenticated) {
      setSnackData({
        open: true,
        message: "Invalid credentials",
        severity: "error",
      });
      setInvalid({ password: true, username: true });
      return;
    }
    setAuth({ username: u_name, authenticated, authenticating: false });
    navigate("/");
  };

  return (
    <Page title="React Dish Poll: Login" height={"100vh"}>
      <Container maxWidth="md" sx={{ height: "100%" }}>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
          gap={2}
        >
          <Avatar
            alt="user-avatar"
            src="https://joeschmoe.io/api/v1/random"
            sx={{
              width: 80,
              height: 80,
              border: "1px solid rgba(0,0,0,0.7)",
              mb: 2,
            }}
          />

          <TextField
            error={invalid.username}
            value={username}
            label="Username"
            variant="outlined"
            placeholder="username..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setInvalid((prev) => ({ ...prev, username: false }));
              setUsername(e.target.value);
            }}
          />
          <TextField
            error={invalid.password}
            value={password}
            label="Password"
            variant="outlined"
            placeholder="password..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            type="password"
            onChange={(e) => {
              setInvalid((prev) => ({ ...prev, password: false }));
              setPassword(e.target.value);
            }}
          />
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>

        <Snackbar
          open={snackData.open}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <Alert onClose={handleSnackClose} severity={snackData.severity}>
            {snackData.message}
          </Alert>
        </Snackbar>
      </Container>
    </Page>
  );
};

export default LoginPage;
