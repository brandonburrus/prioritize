import React from "react";
import { Center, CircularProgress } from "@chakra-ui/react";

/**
 * TODO: Add Documentation
 */
function FullpageSpinner({ if: predicateCondition, children }) {
  if (!predicateCondition) {
    return children;
  }
  return (
    <Center w="100vw" h="100vh">
      <CircularProgress isIndeterminate color="blue.500" />
    </Center>
  );
}

export default FullpageSpinner;
