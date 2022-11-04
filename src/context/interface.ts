import { Dispatch, SetStateAction } from "react";
import { IUserAuthResult } from "../db/interface";

export type AuthType  = IUserAuthResult & { authenticating: boolean };

export interface IAuthContextType {
  auth: AuthType
  setAuth: Dispatch<SetStateAction<AuthType>>;
}
