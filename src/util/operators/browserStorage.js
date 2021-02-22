import { of } from "rxjs";
import { tap, map } from "rxjs/operators";
import { identity } from "ramda";

/**
 * RxJS operator to save a value to session storage
 */
export function saveToSessionStorage(sessionStorageKey, mapper = identity) {
  return tap(result => {
    if (window) {
      window.sessionStorage.setItem(sessionStorageKey, mapper(result));
    }
  });
}

/**
 * RxJS operator to save a value to local storage
 */
export function saveToLocalStorage(localStorageKey, mapper = identity) {
  return tap(result => {
    if (window) {
      window.localStorage.setItem(localStorageKey, mapper(result));
    }
  });
}

/**
 * RxJS operator to retrieve a value from session storage
 */
export function retrieveFromSessionStorage(sessionStorageKey) {
  if (window) {
    return of(window.sessionStorage.getItem(sessionStorageKey));
  }
  return of(null);
}

/**
 * RxJS operator to retrieve a value from local storage
 */
export function retrieveFromLocalStorage(localStorageKey) {
  if (window) {
    return of(window.localStorage.getItem(localStorageKey));
  }
  return of(null);
}

/**
 * RxJS operator to delete a key in session storage
 */
export function deleteFromSessionStorage(sessionStorageKey) {
  return map(value => {
    if (window) {
      window.sessionStorage.removeItem(sessionStorageKey);
    }
    return value;
  });
}

/**
 * RxJS operator to delete a key in local storage
 */
export function deleteFromLocalStorage(localStorageKey) {
  return map(value => {
    if (window) {
      window.localStorage.removeItem(localStorageKey);
    }
    return value;
  });
}
