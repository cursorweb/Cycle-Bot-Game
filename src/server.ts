import * as Discord from "discord.js";
import Big from "bignumber.js";
import express from "express";
import { Webhook } from "@top-gg/sdk";

import { Database, Colors, brackets } from "./global.js";
import { ItemEnum } from "./util/data/item.js";


export function initiate(client: Discord.Client) {
  const app = express();
  const webhook = new Webhook(process.env.TOPGG);

  app.get("/", (_, res) => res.end("My prefix is '&'!"));

  app.post("/dblwebhook", webhook.listener(vote => {
    const id = vote.user;
    const user = Database.getUser(id);
    if (!user) return;

    let voteCrate = user.inv[ItemEnum.VoteCrate];
    let amt = new Big(voteCrate || 0);
    amt = amt.plus(1);
    voteCrate = amt.toString();

    client.users.cache.get(id)?.send({
      embeds: [{
        color: Colors.PRIMARY,
        title: "Thank you for voting!",
        description: `For voting, you get a ${brackets("vote crate")}!`,
        footer: {
          text: "To open a vote crate, use &open 'vote crate'"
        }
      }]
    });
  }));

  app.listen(8080);
}