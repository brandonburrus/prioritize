import { of, zip } from "rxjs";
import { catchError, flatMap, ignoreElements, map, tap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { combineEpics, ofType } from "redux-observable";
import {
  saveToSessionStorage,
  deleteFromSessionStorage,
  deleteFromLocalStorage,
} from "../../util/operators/browserStorage";
import apiConfig from "../../config/api.json";
import authConfig from "../../config/auth.json";
import routes from "../../config/routes.json";
import decodeJwt from "../../util/operators/decodeJwt";
import { navigate } from "@reach/router";
import * as actions from "../actions";

const goTo = dest => tap(() => navigate(dest));

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
      zip(
        ajax({
          method: "POST",
          url: apiConfig.routes.LOG_IN,
          headers: {
            "content-type": "application/json",
            "x-transaction-id": action.payload.transId,
          },
          body: JSON.stringify(action.payload),
        }),
        of(action)
      )
    ),
    map(([res, action]) => {
      const { token } = res.response;
      if (action.payload.rememberMe) {
        window.localStorage.setItem(authConfig.AUTH_STORAGE_KEY, token);
      } else {
        window.sessionStorage.setItem(authConfig.AUTH_STORAGE_KEY, token);
      }
      return token;
    }),
    decodeJwt(),
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
 * Token storage handling
 */
const storageTokenEpic = action$ =>
  action$.pipe(
    ofType(actions.auth.storeToken.type),
    goTo(routes.INDEX),
    ignoreElements()
  );

/**
 * Token deletion handling
 */
const deleteTokenEpic = action$ =>
  action$.pipe(
    ofType(actions.auth.deleteToken.type),
    deleteFromSessionStorage(authConfig.AUTH_STORAGE_KEY),
    deleteFromLocalStorage(authConfig.AUTH_STORAGE_KEY),
    goTo(routes.LOG_IN),
    ignoreElements()
  );

export default combineEpics(
  loginEpic,
  signupEpic,
  logoutEpic,
  storageTokenEpic,
  deleteTokenEpic
);
