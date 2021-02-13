import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import express from "express";
import { Webhook } from "@top-gg/sdk";

import { Database, Colors, commanum, brackets } from "./global";


export function initiate(client: Discord.Client) {
  const app = express();
  const webhook = new Webhook(process.env.TOPGG);

  app.get("/", (_, res) => res.end("My prefix is '&'!"));

  app.post("/dblwebhook", webhook.middleware(), (req, res) => {
    if (!req.vote) return res.end();
    const id = req.vote.user;
    const user = Database.getUser(id);
    if (!user) return;

    const cycles = new Big(user.cycles);
    const cpp = new Big(user.cpp).times(5);

    user.cycles = cycles.plus(cpp).toString();

    client.users.cache.get(id)?.send({
      embed: {
        color: Colors.PRIMARY,
        title: "Thank you for voting!",
        description: `For voting, you get ${brackets(commanum(cpp.toString()))} text!`
      }
    });

    res.end();
  });

  app.listen(8080);
}