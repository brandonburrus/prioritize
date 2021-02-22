import { of } from "rxjs";
import {
  map,
  filter,
  flatMap,
  catchError,
  ignoreElements,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { combineEpics, ofType } from "redux-observable";
import {
  saveToSessionStorage,
  deleteFromSessionStorage,
} from "../../util/operators/browserStorage";
import apiConfig from "../../config/api.json";
import authConfig from "../../config/auth.json";
import decodeJwt from "../../util/operators/decodeJwt";
import * as actions from "../actions";

/**
 * Saves incoming raw JWT to storage, then decoding it to be
 * stored in state
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
 * Login flow logic
 *  1 - Send login ajax reqest
 *  2 - Save successful request to session storage
 *  3 - Decode raw JWT
 *  4 - Send success action + token storage action
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
 * Sign up flow logic
 *  1 - Send sign up ajax request
 *  2 - Save successful token to storage
 *  3 - Decode raw JWT
 *  4 - Send sign up success action + token storage action
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

/**
 * Log out flow
 */
const logoutEpic = action$ =>
  action$.pipe(ofType(actions.auth.logout.type), map(actions.auth.deleteToken));

/**
 * Token deletion handling
 */
const deleteTokenEpic = action$ =>
  action$.pipe(
    ofType(actions.auth.deleteToken.type),
    deleteFromSessionStorage(authConfig.AUTH_STORAGE_KEY),
    ignoreElements()
  );

export default combineEpics(
  tokenCheckEpic,
  loginEpic,
  signupEpic,
  logoutEpic,
  deleteTokenEpic
);
