import { createReducer } from "@reduxjs/toolkit";
import { auth } from "../actions";

/**
 * Auth-related state (login, signup, user details, and logout)
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
    rememberMe: false,
    inflight: false,
    err: null,
  },
};

export default createReducer(INIT_STATE, builder => {
  builder
    .addCase(auth.storeToken, (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.profileImg = action.payload.img;
      state.name = action.payload.name;
      state.emailVerified = action.payload.emailVerified;
    })
    .addCase(auth.loginStart, (state, action) => {
      state.login.inflight = true;
      state.login.rememberMe = action.payload.rememberMe;
    })
    .addCase(auth.loginSuccess, state => {
      state.login.inflight = false;
    })
    .addCase(auth.loginFail, (state, action) => {
      state.login.inflight = false;
      state.login.err = action.payload.err;
    })
    .addCase(auth.signupStart, state => {
      state.signup.inflight = true;
    })
    .addCase(auth.signupSuccess, state => {
      state.signup.inflight = false;
    })
    .addCase(auth.signupFail, (state, action) => {
      state.signup.inflight = false;
      state.signup.err = action.payload.err;
    })
    .addCase(auth.logout, state => {
      state.userId = null;
      state.email = null;
      state.profileImg = null;
      state.name = null;
      state.emailVerified = false;
      state.login.rememberMe = false;
    });
});
