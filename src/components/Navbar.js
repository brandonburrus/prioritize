import React from "react";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  chakra,
} from "@chakra-ui/react";
import navbarConfig from "../config/navbar.json";
import { Link } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOutOutline as LogoutIcon } from "react-icons/io5";
import { AppIcon } from "../config/appConstants";
import * as actions from "../redux/actions";

const ChakraLogoutIcon = chakra(LogoutIcon);

/**
 * Navigation bar that sits on the top of the page in the default layout
 */
function Navbar({ topRightAdornment }) {
  const userId = useSelector(state => state.auth.userId);
  const userName = useSelector(state => state.auth.name);
  const profileImg = useSelector(state => state.auth.profileImg);
  const email = useSelector(state => state.auth.email);

  const dispatch = useDispatch();

  return (
    <>
      <Box bg="blue.500" height="7px" />
      <Box bg="gray.100">
        <Container>
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            minH="68px"
          >
            <Link to="/">
              <AppIcon color="blue.500" mb="2px" mr="14px" h="27px" w="27px" />
            </Link>
            {Object.entries(navbarConfig.links).map(([key, navLink]) => (
              <Link to={navLink.route} key={key}>
                <Heading size="md" color="gray.800">
                  {navLink.name}
                </Heading>
              </Link>
            ))}
            <Flex flexGrow={1} justifyContent="flex-end">
              {userId && (
                <Menu placement="bottom-end" autoSelect={false}>
                  <MenuButton>
                    <Avatar size="sm" name={userName} src={profileImg} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Hello, {userName || email}</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => dispatch(actions.auth.logout())}>
                      <ChakraLogoutIcon
                        color="blue.500"
                        w="24px"
                        h="24px"
                        mr="6px"
                      />
                      <Text>Log out</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
              {topRightAdornment}
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default Navbar;
