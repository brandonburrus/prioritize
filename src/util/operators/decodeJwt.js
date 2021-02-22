import { identity } from "ramda";
import { map } from "rxjs/operators";
import jwt from "jsonwebtoken";

/**
 * RxJS operator to decode a JWT
 *
 * @param {function} tokenMapper Mapping function to apply to
 * given input
 */
function decodeJwt(tokenMapper = identity) {
  return map(token => jwt.decode(tokenMapper(token)));
}

export default decodeJwt;
