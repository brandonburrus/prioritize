import authConfig from "../config/auth.json";
import jwt from "jsonwebtoken";

/**
 * TODO: Add documentation
 */
function getUserDetails() {
  let token = window.sessionStorage.getItem(authConfig.AUTH_STORAGE_KEY);
  if (!token) {
    token = window.localStorage.getItem(authConfig.AUTH_STORAGE_KEY);
  }
  return jwt.decode(token);
}

export default getUserDetails;
