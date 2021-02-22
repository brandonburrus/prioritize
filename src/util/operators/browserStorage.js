import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { identity } from "ramda";

/**
 * TODO: Add documentation
 */
export function saveToSessionStorage(sessionStorageKey, mapper = identity) {
  return tap(result => {
    if (window) {
      window.sessionStorage.setItem(sessionStorageKey, mapper(result));
    }
  });
}

/**
 * TODO: Add documentation
 */
export function saveToLocalStorage(localStorageKey, mapper = identity) {
  return tap(result => {
    if (window) {
      window.localStorage.setItem(localStorageKey, mapper(result));
    }
  });
}

/**
 * TODO: Add documentation
 */
export function retrieveFromSessionStorage(sessionStorageKey) {
  if (window) {
    return of(window.sessionStorage.getItem(sessionStorageKey));
  }
  return of(null);
}

/**
 * TODO: Add documentation
 */
export function retrieveFromLocalStorage(localStorageKey) {
  if (window) {
    return of(window.localStorage.getItem(localStorageKey));
  }
  return of(null);
}
