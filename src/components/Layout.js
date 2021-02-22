import React from "react";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
import { Container, Box, Flex } from "@chakra-ui/react";

/**
 * Primary app layout component
 */
function Layout({ fill = false, topRightAdornment, children }) {
  return (
    <Box h="100vh" w="100vw" overflow="scroll" bg="gray.50">
      <Flex minH="calc(100vh - 52px)" flexDirection="column">
        <Navbar topRightAdornment={topRightAdornment} />
        {fill ? children : <Container flexGrow={1}>{children}</Container>}
      </Flex>
      <Footer minH="52px" />
    </Box>
  );
}

export default Layout;
