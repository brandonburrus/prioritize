import { createAction } from "@reduxjs/toolkit";
import { v4 as id } from "uuid";

/**
 * Factory function for creating an action with a built-in
 * transaction id on any payload
 */
const action = actionName =>
  createAction(actionName, payloadInput => ({
    payload: {
      transId: id(),
      ...(typeof payloadInput !== "undefined"
        ? typeof payloadInput === "object"
          ? payloadInput
          : {
              value: payloadInput,
            }
        : {}),
    },
  }));

/**
 * Auth actions
 */
export const auth = {
  signupStart: action("AUTH/signupStart"),
  signupSuccess: action("AUTH/signupSuccess"),
  signupFail: action("AUTH/signupFail"),
  loginStart: action("AUTH/loginStart"),
  loginSuccess: action("AUTH/loginSuccess"),
  loginFail: action("AUTH/loginFail"),
  logout: action("AUTH/logout"),
  tokenCheck: action("AUTH/tokenCheck"),
  storeToken: action("AUTH/storeToken"),
  deleteToken: action("AUTH/deleteToken"),
};

/**
 * Routing actions
 */
export const routing = {
  goTo: action("ROUTING/goToRoute"),
};

/**
 * Priority actions
 */
export const priority = {};

/**
 * Preferences actions
 */
export const preferences = {};
