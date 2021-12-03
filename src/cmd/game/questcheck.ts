import * as Discord from "discord.js";
import { BigNumber as Big } from "bignumber.js";
import { Command, Colors, Bot, brackets, plural, commanum, Database } from "../../global";
import { code as drops } from "../../util/data/drops";
import { boosts } from "../../util/data/boosts/boosts";
import { levelUp } from "../../util/levels";
import { socialMedia } from "../../util/data/social-media";


class C extends Command {
  names = ["questcheck", "qt"];
  help = "Check your quest progress!"
}