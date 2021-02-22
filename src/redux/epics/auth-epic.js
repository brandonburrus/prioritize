import { of } from "rxjs";
import { map, filter, flatMap, catchError, tap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { combineEpics, ofType } from "redux-observable";
import { saveToSessionStorage } from "../../util/operators/browserStorage";
import apiConfig from "../../config/api.json";
import authConfig from "../../config/auth.json";
import decodeJwt from "../../util/operators/decodeJwt";
import * as actions from "../actions";

/**
 * TODO: Add documentation
 */
const tokenCheckEpic = action$ =>
  action$.pipe(
    ofType(actions.auth.tokenCheck.type),
    saveToSessionStorage(authConfig.AUTH_STORAGE_KEY),
    decodeJwt(),
    filter(token => token !== null),
    map(actions.auth.storeToken)
  );

/**
 * TODO: Add documentation
 */
const loginEpic = action$ =>
  action$.pipe(
    ofType(actions.auth.loginStart.type),
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
    saveToSessionStorage(
      authConfig.AUTH_STORAGE_KEY,
      response => response.response.token
    ),
    decodeJwt(response => response.response.token),
    flatMap(token =>
      of(actions.auth.loginSuccess(), actions.auth.storeToken(token))
    ),
    catchError(err => of(actions.auth.loginFail({ err })))
  );

/**
 * TODO: Add documentation
 */
const signupEpic = action$ =>
  action$.pipe(
    ofType(actions.auth.signupStart.type),
    flatMap(action =>
      ajax({
        method: "POST",
        url: apiConfig.routes.SIGN_UP,
        headers: {
          "content-type": "application/json",
          "x-transaction-id": action.payload.transId,
        },
        body: JSON.stringify(action.payload),
      })
    ),
    saveToSessionStorage(
      authConfig.AUTH_STORAGE_KEY,
      response => response.response.token
    ),
    decodeJwt(response => response.response.token),
    flatMap(token =>
      of(actions.auth.signupSuccess(), actions.auth.storeToken(token))
    ),
    catchError(err => of(actions.auth.signupFail({ err })))
  );

export default combineEpics(tokenCheckEpic, loginEpic, signupEpic);
