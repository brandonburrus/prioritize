import { of } from "rxjs";
import { tap, map } from "rxjs/operators";
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

/**
 * TODO: Add documentation
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
 * TODO: Add documentation
 */
export function deleteFromLocalStorage(localStorageKey) {
  return tap(() => {
    if (window) {
      window.localStorage.removeItem(localStorageKey);
    }
  });
}
