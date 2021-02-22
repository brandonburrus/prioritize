import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "@reach/router";
import FullpageSpinner from "../components/FullpageSpinner";

function withAuthenticationCheck(Component) {
  function AuthCheckHOC(props) {
    const userId = useSelector(state => state.auth.userId);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (!userId && location !== "/login") {
        setTimeout(() => navigate("/login"), 500);
      }
    }, [userId]);

    return (
      <FullpageSpinner if={userId === null}>
        <Component {...props} />
      </FullpageSpinner>
    );
  }

  AuthCheckHOC.displayName = "AuthCheckHOC";
  return AuthCheckHOC;
}

export default withAuthenticationCheck;
