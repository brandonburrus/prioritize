import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullpageSpinner from "../components/FullpageSpinner";
import authConfig from "../config/auth.json";
import useOnMount from "../hooks/useOnMount";
import getUserDetails from "../util/getUserDetails";
import * as actions from "../redux/actions";
import { useNavigate } from "@reach/router";
import routes from "../config/routes.json";

/**
 * HoC for authenticated pages, will automatically detect when a user
 * is not signed in and redirect to the login route
 */
function withAuthenticationCheck(Component) {
  function AuthCheckHOC(props) {
    const userId = useSelector(state => state.auth.userId);
    const [showSpinner, setShowSpinner] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useOnMount(() => {
      if (!userId) {
        const userToken = getUserDetails();
        if (userToken && !userId) {
          dispatch(actions.auth.storeToken(userToken));
        } else {
          navigate(routes.LOG_IN);
        }
      }
      const timerId = setInterval(() => {
        if (
          !window.localStorage.getItem(authConfig.AUTH_STORAGE_KEY) &&
          !window.sessionStorage.getItem(authConfig.AUTH_STORAGE_KEY)
        ) {
          dispatch(actions.auth.logout());
        }
      }, 10000);
      setShowSpinner(false);
      return () => clearInterval(timerId);
    });

    return (
      <FullpageSpinner if={showSpinner}>
        <Component {...props} />
      </FullpageSpinner>
    );
  }

  AuthCheckHOC.displayName = "AuthCheckHOC";
  return AuthCheckHOC;
}

export default withAuthenticationCheck;
