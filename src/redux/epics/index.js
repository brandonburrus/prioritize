import testEpic from "./testEpic";
import { combineEpics } from "redux-observable";

export default combineEpics(testEpic);
