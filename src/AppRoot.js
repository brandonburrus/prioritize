import React from "react";
import theme from "./theme";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "@reach/router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

/**
 * Root app component
 */
function App() {
  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <Router>
        <Home path="/" />
        <Signup path="/signup" />
        <Login path="/login" />
        <NotFound default />
      </Router>
    </ChakraProvider>
  );
}

export default App;
