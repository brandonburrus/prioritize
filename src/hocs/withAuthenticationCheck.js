import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "@reach/router";
import FullpageSpinner from "../components/FullpageSpinner";
import routes from "../config/routes.json";

/**
 * HoC for authenticated pages, will automatically detect when a user
 * is not signed in and redirect to the login route
 */
function withAuthenticationCheck(Component) {
  function AuthCheckHOC(props) {
    const userId = useSelector(state => state.auth.userId);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (!userId && location !== routes.LOGIN) {
        setTimeout(() => navigate(routes.LOGIN), 500);
      }
    }, [userId]);

    return (
      <FullpageSpinner if={userId === null} {...props}>
        <Component {...props} />
      </FullpageSpinner>
    );
  }

  AuthCheckHOC.displayName = "AuthCheckHOC";
  return AuthCheckHOC;
}

export default withAuthenticationCheck;
