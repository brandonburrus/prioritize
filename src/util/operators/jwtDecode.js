import { identical } from "ramda";
import { map } from "rxjs/operators";
import jwt from "jsonwebtoken";

export default function decodeJwt(tokenMapper = identical) {
  return map(token => jwt.decode(tokenMapper(token)));
}
