import { ofType } from "redux-observable";
import { startWith } from "rxjs/operators";

export default actions$ =>
  actions$.pipe(ofType("ignore"), startWith({ type: "TEST" }));
