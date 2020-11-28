import * as Discord from "discord.js";
import * as format from "./util/format";
import * as util from "./util/util";

export { format, util };

export interface UserInput {
  command: string;
  args: string[];
};

export class Command {
  names: string[] = [];
  help: string = "*no help provided*";

  isAdmin: boolean = false;

  cooldownUsers: { [index:string]: number } = {};
  cooldown: number = 0; // ms

  exec(msg: Discord.Message, args: string[]) { }

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