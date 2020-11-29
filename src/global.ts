import * as Discord from "discord.js";

export * from "./util/format";
export * from "./util/util";


export interface UserInput {
  command: string;
  args: string[];
};

export class Command {
  names: string[] = [];
  help: string = "*no help provided*";
  examples: string[] = [];

  isAdmin: boolean = false;

  cooldownUsers: { [index:string]: number } = {};
  cooldown: number = 0; // ms

  exec(_: Discord.Message, _1: string[], _2: Discord.Client) {}

  getCooldown(user: Discord.User): number | false {
    return this.cooldownUsers[user.id] ? this.cooldownUsers[user.id] : false;
  }

  setCooldown(user: Discord.User) {
    if (this.getCooldown(user)) return;
    this.cooldownUsers[user.id] = this.cooldown;
  }

  initCooldown() {
    setInterval(() => {
      for (const id in this.cooldownUsers) {
        this.cooldownUsers[id]--;

        if (this.cooldownUsers[id] < 0) {
          delete this.cooldownUsers[id];
        }
      }
    }, 1);
  }

  constructor() {
    if (this.cooldown > 0) this.initCooldown();
  }
}