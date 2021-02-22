import React from "react";
import withAuthenticationCheck from "../hocs/withAuthenticationCheck";

/**
 * Default 404 route page
 */
function NotFound() {
  return <p>404 Not Found</p>;
}

export default withAuthenticationCheck(NotFound);
