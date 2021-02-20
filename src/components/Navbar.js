import React from "react";
import { chakra, Container, Box, Flex } from "@chakra-ui/react";
import navbarConfig from "../config/navbar.json";
import { Link } from "@reach/router";
import { TiHome as HomeIcon } from "react-icons/ti";

const ChakraHomeIcon = chakra(HomeIcon);

/**
 * Navigation bar that sits on the top of the page in the default layout
 */
function Navbar() {
  return (
    <>
      <Box bg="blue.500" height="7px" />
      <Box bg="gray.100">
        <Container py="14px">
          <Flex flexDirection="row" alignItems="center">
            <Link to="/">
              <ChakraHomeIcon mb="2px" mr="14px" h="24px" w="24px" />
            </Link>
            {Object.entries(navbarConfig.links).map(([key, navLink]) => (
              <Link to={navLink.route} key={key}>
                {navLink.name}
              </Link>
            ))}
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default Navbar;
