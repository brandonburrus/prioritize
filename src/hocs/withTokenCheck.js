import React, { useState } from "react";
import useOnMount from "../hooks/useOnMount";
import { useDispatch } from "react-redux";
import FullpageSpinner from "../components/FullpageSpinner";
import getUserDetails from "../util/getUserDetails";
import * as actions from "../redux/actions";

/**
 * HoC to detect if a user has been signed in on the given page component
 */
function withTokenCheck(Component) {
  function TokenCheckHOC(props) {
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(false);

    useOnMount(() => {
      const token = getUserDetails();
      if (token) {
        dispatch(actions.auth.storeToken(token));
      }
      setShowSpinner(false);
    });

    return (
      <FullpageSpinner if={showSpinner}>
        <Component {...props} />
      </FullpageSpinner>
    );
  }

  TokenCheckHOC.displayName = "TokenCheckHOC";
  return TokenCheckHOC;
}

export default withTokenCheck;
