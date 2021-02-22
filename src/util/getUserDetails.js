import authConfig from "../config/auth.json";
import jwt from "jsonwebtoken";

/**
 * Fetches the user JWT from storage and returns the decoded token
 */
function getUserDetails() {
  let token = window.sessionStorage.getItem(authConfig.AUTH_STORAGE_KEY);
  if (!token) {
    token = window.localStorage.getItem(authConfig.AUTH_STORAGE_KEY);
  }
  return jwt.decode(token);
}

export default getUserDetails;
