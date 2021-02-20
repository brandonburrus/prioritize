import { createReducer } from "@reduxjs/toolkit";
import { auth } from "../actions";

/**
 * TODO: Add documentation
 */

const INIT_STATE = {
  userId: null,
  email: null,
};

export default createReducer(INIT_STATE, $ => $);
