import { identity } from "ramda";
import { map } from "rxjs/operators";
import jwt from "jsonwebtoken";

/**
 * TODO: Add documentation
 */
function decodeJwt(tokenMapper = identity) {
  return map(token => jwt.decode(tokenMapper(token)));
}

export default decodeJwt;
