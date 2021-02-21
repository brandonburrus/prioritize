import { combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { map, filter, tap, flatMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import authConfig from "../../config/auth.json";
import apiConfig from "../../config/api.json";
import { auth } from "../actions";
import jwt from "jsonwebtoken";

/**
 * TODO: Add documentation
 */
const tokenCheckEpic = action$ =>
  action$.pipe(
    ofType(auth.tokenCheck.type),
    map(() => localStorage.getItem(authConfig.localStorageKey)),
    map(jwt.decode),
    filter(token => token !== null),
    map(auth.storeToken)
  );

/**
 * TODO: Add documentation
 */
const loginEpic = action$ =>
  action$.pipe(
    ofType(auth.loginStart.type),
    flatMap(action =>
      ajax({
        method: "POST",
        url: apiConfig.routes.LOG_IN,
        headers: {
          "content-type": "application/json",
          "x-transaction-id": action.payload.transId,
        },
        body: JSON.stringify(action.payload),
      })
    ),
    tap(ajaxResult =>
      localStorage.setItem(
        authConfig.localStorageKey,
        ajaxResult.response.token
      )
    ),
    map(ajaxResult => jwt.decode(ajaxResult.response.token)),
    flatMap(token => of(auth.loginSuccess(), auth.storeToken(token)))
  );

export default combineEpics(tokenCheckEpic, loginEpic);
