import React from "react";
import theme from "./theme";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "@reach/router";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import reduxStore from "./redux/store";

/**
 * Root app component
 */
function App() {
  return (
    <Provider store={reduxStore}>
      <ChakraProvider theme={extendTheme(theme)}>
        <Router>
          <Home path="/" />
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
