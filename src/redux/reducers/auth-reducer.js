import { createReducer } from "@reduxjs/toolkit";
import { auth } from "../actions";

/**
 * TODO: Add documentation
 */

const INIT_STATE = {
  userId: null,
  email: null,
  loginInflight: false,
  signupInflight: false,
};

/**
 * TODO: Add documentation
 */
export default createReducer(INIT_STATE, builder => {
  builder
    .addCase(auth.storeToken, (_state, action) => {
      return {
        userId: action.payload.userId,
        email: action.payload.email,
      };
    })
    .addCase(auth.loginStart, state => {
      state.loginInflight = true;
    })
    .addCase(auth.loginSuccess, state => {
      state.loginInflight = false;
    })
    .addCase(auth.loginFail, state => {
      state.loginInflight = false;
    });
});
