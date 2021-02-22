import { createReducer } from "@reduxjs/toolkit";
import { auth } from "../actions";

/**
 * TODO: Add documentation
 */

const INIT_STATE = {
  userId: null,
  email: null,
  profileImg: null,
  name: null,
  emailVerified: false,
  signup: {
    inflight: false,
    err: null,
  },
  login: {
    inflight: false,
    err: null,
  },
};

/**
 * TODO: Add documentation
 */
export default createReducer(INIT_STATE, builder => {
  builder
    .addCase(auth.storeToken, (state, action) => {
      console.log(action);
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.profileImg = action.payload.img;
      state.name = action.payload.name;
      state.emailVerified = action.payload.emailVerified;
    })
    .addCase(auth.loginStart, state => {
      state.login.inflight = true;
    })
    .addCase(auth.loginSuccess, state => {
      state.login.inflight = false;
    })
    .addCase(auth.loginFail, (state, action) => {
      state.login.inflight = false;
      state.login.err = action.payload.err;
    });
});
