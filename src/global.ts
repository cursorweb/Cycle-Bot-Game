import * as Discord from "discord.js";
import { Bot, brackets } from "./util/format";
import { addMs, msBetween } from "./util/util";
import { genSchema, setUser, getUser, CycleUser } from "./util/database/database";

export * from "./util/format";
export * from "./util/util";

export * as Database from "./util/database/database";

export interface UserInput {
  command: string;
  args: string[];
}

export class Command {
  names: string[] = [];
  help = "*no help provided*";
  examples: string[] = [];
  isGame: 'y' | 'n' | 'p' = 'p'; // if we should initiate player or not
  /* its either:
    'y' (yes, auto-initiate)
    'n' (don't initiate)
    'p' (don't initiate, and error if player does not have profile)
  */

  isAdmin = false;

  private cooldownUsers: { [index:string]: Date } = {};
  get cooldown() { return 0; } // ms

  wrap(msg: Discord.Message, args: string[], client: Discord.Client) {
    if (this.cooldown) this.setCooldown(msg.author);

    if (this.isGame == 'y' && !getUser(msg.author.id)) setUser(msg.author.id, genSchema(msg.author));
    else if (this.isGame == 'p' && !getUser(msg.author.id)) return Bot.errormsg(msg, `You don't have a profile yet!
    > Do \`&code\` to start playing!`, "Profile not found!");

    if (getUser(msg.author.id).name != msg.author.tag) setUser(msg.author.id, { name: msg.author.tag } as CycleUser);
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

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `You still have ${brackets((ms / 1000).toFixed(2))} seconds left!`, "Cooldown!");
  }
}