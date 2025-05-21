import { from, mergeMap, map } from "rxjs";
import { Account } from "./Account.model";


export const getAccountInfo = () => {
  return from(
    fetch("http://localhost:5000/account", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).pipe(
    mergeMap((res: Response) => from(res.json())),
    map((data: Account) => new Account(data))
  );
};
