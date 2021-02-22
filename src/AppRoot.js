import React from "react";
import theme from "./theme";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "@reach/router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import routes from "./config/routes.json";

/**
 * Root app component
 */
function App() {
  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <Router>
        <Home path={routes.INDEX} />
        <Signup path={routes.SIGN_UP} />
        <Login path={routes.LOG_IN} />
        <NotFound default />
      </Router>
    </ChakraProvider>
  );
}

export default App;
