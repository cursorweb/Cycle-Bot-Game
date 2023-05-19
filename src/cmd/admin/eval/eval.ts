import * as Discord from "discord.js";
import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import Big from "bignumber.js";
import { Command, Colors, codestr, Database, commanum } from "../../../global.js";
import { ItemEnum } from "../../../util/data/item.js";

const vars = [
  "client",
  "process",
  "Big",
  "Database",
  "ItemEnum"
].map(k => `\`${k}\``).join(", ");

class C extends Command {
  names = ["eval"];
  help = "Evaluates code.";
  examples = ["eval ```return 1+1```"];
  isGame = "n" as const;

  isAdmin = true;

  exec(msg: Discord.Message, args: string[], client: Discord.Client) {
    const code = msg.content.replace(/&.+? (```([\s\S]*?)```|([^`]+))/g, "$2$3");

    msg.channel.send({
      embeds: [{
        color: Colors.WARNING,
        title: "Confirm Execution!",
        description: `Executing:
${codestr(code, "js")}
Vars: ${vars}`,
        footer: {
          text: "Use return to return output!"
        }
      }],
      components: [
        new ActionRowBuilder<ButtonBuilder>()
          .addComponents([
            new ButtonBuilder()
              .setCustomId("yes")
              .setEmoji("✔️")
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId("no")
              .setEmoji("✖️")
              .setStyle(ButtonStyle.Danger)
          ])
      ]
    }).then(async mesg => {
      const collector = mesg.createMessageComponentCollector({
        filter: (inter) => inter.user.id == msg.author.id,
        max: 1,
        time: 60000
      });

      collector.on("collect", async choice => {
        if (choice.customId == "no") {
          collector.stop();
          await mesg.edit({
            embeds: [{
              color: Colors.WARNING,
              title: "CANCELLED",
              description: "Code execution cancelled. All done!"
            }]
          });
          return;
        }

        try {
          let output = new Function(
            "client",
            "process",
            "Big",
            "Database",
            "ItemEnum",
            code
          )(client,
            process,
            Big,
            Database,
            ItemEnum);

          if (output instanceof Big) {
            output = `new Big(${commanum(output.toString())})`;
          } else if (typeof output == "object") {
            output = JSON.stringify(output, null, 2);
          } else {
            output = JSON.stringify(output);
          }

          mesg.edit({
            embeds: [{
              color: Colors.PRIMARY,
              title: "Beep Boop Bop Boop!",
              description: `Output was\n${codestr(output, "yaml")}`
            }]
          });
        } catch (e) {
          mesg.edit({
            embeds: [{
              color: Colors.ERROR,
              title: "Error!!",
              description: `Error was\n${codestr(String(e), "js")}`
            }]
          });
        }
      });

      collector.on("end", collected => {
        if (collected.size == 0) {
          mesg.edit({
            embeds: [{
              color: Colors.PRIMARY,
              title: "Cancelled",
              description: "You didn't make a response!"
            }]
          });
        }

        mesg.edit({
          components: []
        });
      });
    });
  }
}

export const c = new C();