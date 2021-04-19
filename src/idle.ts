import { BigNumber as Big } from "bignumber.js";
import { Database } from "./global";
import { boosts } from "./util/data/boosts/boosts";

setInterval(() => {
  for (const id in Database.pdb) {
    const user = Database.getUser(id);
    const userBoosts = Database.Boost.getUser(id);
    let tpm = new Big(user.tpm);

    for (const index in userBoosts) {
      const amt = userBoosts[index];
      const itm = boosts[index];
      tpm = tpm.times(new Big(itm.tpm || 0).plus(100).div(100)).times(amt);
    }

    if (tpm.gt(0)) {
      let text = new Big(user.text);
      text = text.plus(tpm);
      user.text = text.toString();
    }
  }
}, 6e4); // 1 minute