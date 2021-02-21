import { combineEpics } from "redux-observable";
import authEpic from "./auth-epic";

export default combineEpics(authEpic);
