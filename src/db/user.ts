import { UserData } from "../data";
import { IUserAuthResult, IUserLoginProps } from "./interface";

const AUTH_KEY = "user_auth";

export const userLoginHandler = ({
  username,
  password,
}: IUserLoginProps): IUserAuthResult => {
  let isAuthenticated = false;

  UserData.forEach(({ password: u_pass, username: u_name }) => {
    if (u_name === username && u_pass === password) isAuthenticated = true;
  });

  if (!isAuthenticated) {
    return {
      username,
      authenticated: isAuthenticated,
    };
  }

  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ username, authenticated: isAuthenticated })
  );

  return { username, authenticated: isAuthenticated };
};

export const getLoggedInAuthHandler = (): IUserAuthResult => {
  const auth_stringify = localStorage.getItem(AUTH_KEY);

  if (auth_stringify === null) return { username: "", authenticated: false };

  const auth = JSON.parse(auth_stringify);
  return auth as IUserAuthResult;
};

export const logoutHandler = () => {
  localStorage.removeItem(AUTH_KEY);
};
