import * as Discord from "discord.js";
import { Bot, brackets, Colors } from "./util/format";
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
  isGame: "y" | "n" | "p" = "p"; // if we should initiate player or not
  /* its either:
    'y' (yes, auto-initiate)
    'n' (don't initiate)
    'p' (don't initiate, and error if player does not have profile)
  */

  isAdmin = false;

  // Date, isSent
  private cooldownUsers: { [index: string]: [Date, boolean] } = {};
  get cooldown() {
    return 0;
  } // ms

  wrap(msg: Discord.Message, args: string[], client: Discord.Client) {
    if (this.cooldown) this.setCooldown(msg.author);

    const isJoined = Boolean(client.guilds.cache.get("788421241005408268")?.member(msg.author.id));

    if (this.isGame == "y" && !getUser(msg.author.id)) {
      msg.channel.send({
        embed: {
          color: Colors.PRIMARY,
          title: "Welcome!",
          description: `Welcome to the bot, ${brackets(msg.author.tag)}! Use \`&guide\` to get a simple tutorial!${!isJoined ? `
Join the [discord server](https://discord.gg/4vTPWdpjFz) for support and perks!` : ""}`
        }
      });
      setUser(msg.author.id, genSchema(msg.author));
    } else if (this.isGame == "p" && !getUser(msg.author.id)) {
      return Bot.errormsg(msg, `You don't have a profile yet!
    > Do \`&code\` to start playing!`, "Profile not found!");
    }

    if (this.isGame != "n" && getUser(msg.author.id).name != msg.author.tag) setUser(msg.author.id, { name: msg.author.tag } as CycleUser);

    if (Math.random() * 100 < 3 && !isJoined) {
      msg.channel.send({
        embed: {
          color: Colors.PRIMARY,
          title: "Reminder",
          description: "Remember to join the [discord server](https://discord.gg/4vTPWdpjFz) for giveaways, perks, and more!"
        }
      });
    }

    this.exec(msg, args, client);
  }

  exec(_: Discord.Message, _1: string[], _2: Discord.Client): void { }

  getCooldown(user: Discord.User) {
    if (!this.cooldownUsers[user.id]) return null;

    if (msBetween(new Date(), this.cooldownUsers[user.id][0]) <= 0) {
      delete this.cooldownUsers[user.id];
      return null;
    }

    return msBetween(new Date(), this.cooldownUsers[user.id][0]);
  }

  setCooldown(user: Discord.User) {
    if (this.getCooldown(user)) return;
    this.cooldownUsers[user.id] = [addMs(new Date(), this.cooldown), false];
  }

  sentCooldown(user: Discord.User) {
    if (!this.cooldownUsers[user.id]) return null;

    return this.cooldownUsers[user.id][1];
  }

  setSent(user: Discord.User) {
    if (this.cooldownUsers) this.cooldownUsers[user.id][1] = true;
  }

  cooldownError(msg: Discord.Message, ms: number) {
    Bot.errormsg(msg, `You still have ${brackets((ms / 1000).toFixed(2))} seconds left!`, "Cooldown!");
  }
}