import { createContext } from "react";
import { IAuthContextType } from "./interface";

export const AuthContext = createContext<IAuthContextType>({
  auth: { authenticated: false, username: "", authenticating: true },
  setAuth: () => {},
});
