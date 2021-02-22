import React from "react";
import {
  Avatar,
  Box,
  Container,
  Flex,
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
import { TiHome as HomeIcon } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOutOutline as LogoutIcon } from "react-icons/io5";
import * as actions from "../redux/actions";

const ChakraHomeIcon = chakra(HomeIcon);
const ChakraLogoutIcon = chakra(LogoutIcon);

/**
 * Navigation bar that sits on the top of the page in the default layout
 */
function Navbar() {
  const userName = useSelector(state => state.auth.name);
  const profileImg = useSelector(state => state.auth.profileImg);
  const email = useSelector(state => state.auth.email);

  const dispatch = useDispatch();

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
            <Flex flexGrow={1} justifyContent="flex-end">
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
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default Navbar;
