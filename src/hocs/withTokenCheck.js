import React, { useEffect } from "react";
import useOnMount from "../hooks/useOnMount";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../redux/actions";
import { useNavigate } from "@reach/router";
import FullpageSpinner from "../components/FullpageSpinner";

/**
 * TODO: Add documentation
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
      <FullpageSpinner if={userId !== null}>
        <Component {...props} />
      </FullpageSpinner>
    );
  }

  TokenCheckHOC.displayName = "TokenCheckHOC";
  return TokenCheckHOC;
}

export default withTokenCheck;
