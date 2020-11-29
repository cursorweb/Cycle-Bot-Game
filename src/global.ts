import * as Discord from "discord.js";
import { addMs, msBetween } from "./util/util";

export * from "./util/format";
export * from "./util/util";

export * as Database from "./util/database/database";

export interface UserInput {
  command: string;
  args: string[];
};

export class Command {
  names: string[] = [];
  help = "*no help provided*";
  examples: string[] = [];

  isAdmin = false;

  private cooldownUsers: { [index:string]: Date } = {};
  get cooldown() { return 0; } // ms

  wrap(msg: Discord.Message, args: string[], client: Discord.Client) {
    if (this.cooldown) this.setCooldown(msg.author);
    this.exec(msg, args, client);
  }

  exec(_: Discord.Message, _1: string[], _2: Discord.Client) {}

  getCooldown(user: Discord.User) {
    if (!this.cooldownUsers[user.id]) return null;

    if (msBetween(new Date(), this.cooldownUsers[user.id]) <= 0) {
      delete this.cooldownUsers[user.id];
      return null;
    }

    return msBetween(new Date(), this.cooldownUsers[user.id]);
  }

  setCooldown(user: Discord.User) {
    if (this.getCooldown(user)) return;
    this.cooldownUsers[user.id] = addMs(new Date(), this.cooldown);
  }

  cooldownError(msg: Discord.Message, ms: number) {}

  constructor() {}
}