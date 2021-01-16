// refer to ./item.ts for metadata.
import { Database } from "../../global";
import { items } from "./item";

// this way, we can utilize the inefficiency of an array search.
// we will check if this object has an implementation, and if not, there won't be one!
export const openItem: { [i: number]: (user: Database.CycleUser, amt: number) => string } = {

};