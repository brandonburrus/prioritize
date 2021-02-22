import React from "react";
import withAuthenticationCheck from "../hocs/withAuthenticationCheck";

/**
 * TODO: Add documentation
 */
function NotFound() {
  return <p>404 Not Found</p>;
}

export default withAuthenticationCheck(NotFound);
