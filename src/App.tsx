import { useContext, useState, useEffect } from "react";
import Router from "./route";
import { AuthContext } from "./context";
import { IUserAuthResult } from "./db/interface";
import { getLoggedInAuthHandler } from "./db";
import { AuthType } from "./context/interface";

function App() {
  const [auth, setAuth] = useState<AuthType>({
    authenticated: false,
    username: "",
    authenticating: true,
  });

  const handleOnLoadAuth = () => {
    const loggedAuth = getLoggedInAuthHandler();
    setAuth({ ...loggedAuth, authenticating: false });
  };

  useEffect(() => {
    handleOnLoadAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
      <Router />
    </AuthContext.Provider>
  );
}

export default App;
