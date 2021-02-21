import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import reducer from "./reducers";
import epics from "./epics";
import thunk from "redux-thunk";
import { auth } from "./actions";

/**
 * Redux-logger configuration
 */
const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
  diff: true,
});

/**
 * Redux-observable configuration
 */
const epicHandler = createEpicMiddleware();

/**
 * Redux store initialization
 */
const reduxStore = configureStore({
  reducer,
  middleware: [logger, thunk, epicHandler],
  devTools: true,
});

epicHandler.run(epics);
reduxStore.dispatch(auth.tokenCheck());

export default reduxStore;
