import { createAction } from "@reduxjs/toolkit";
import { v4 as id } from "uuid";

/**
 * Factory function for creating an action with a built-in
 * transaction id on any payload
 */
const action = actionName =>
  createAction(Symbol(actionName), payloadInput => ({
    payload: {
      ...payloadInput,
      transId: id(),
    },
  }));

/**
 * Auth actions
 */
export const auth = {
  signup: action("AUTH/signup"),
  login: action("AUTH/login"),
  logout: action("AUTH/logout"),
};

/**
 * Priority actions
 */
export const priority = {};
