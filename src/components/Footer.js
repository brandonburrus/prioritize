import React from "react";
import { Box, Center, chakra } from "@chakra-ui/react";
import footerConfig from "../config/footer.json";
import { compose, replace } from "ramda";

/**
 * Formats the copy for the footer properly
 */
export const formatFooterCopy = compose(
  replace("{year}", new Date().getFullYear().toString()),
  replace("{copy}", String.fromCharCode("169"))
);

/**
 * Footer that is attached to the bottom of every page
 */
function Footer() {
  return (
    <Box bg="gray.200" p="14px">
      <Center>
        <p>{formatFooterCopy(footerConfig.copy)}</p>
      </Center>
    </Box>
  );
}

export default chakra(Footer);
