import React, { useEffect } from "react";
import useOnMount from "../hooks/useOnMount";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../redux/actions";
import { useNavigate } from "@reach/router";
import FullpageSpinner from "../components/FullpageSpinner";

/**
 * HoC to detect if a user has been signed in on the given page component
 */
function withTokenCheck(Component) {
  function TokenCheckHOC(props) {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    const navigate = useNavigate();

    useOnMount(() => {
      dispatch(auth.tokenCheck());
    });

    useEffect(() => {
      if (userId) {
        navigate("/");
      }
    }, [userId]);

    return (
      <FullpageSpinner if={userId !== null} {...props}>
        <Component {...props} />
      </FullpageSpinner>
    );
  }

  TokenCheckHOC.displayName = "TokenCheckHOC";
  return TokenCheckHOC;
}

export default withTokenCheck;
