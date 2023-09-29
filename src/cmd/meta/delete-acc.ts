import * as Discord from "discord.js";
import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import { Command, Colors, Database } from "../../global.js";

class C extends Command {
  names = ["delete-account"];
  help = "Deletes your account data from the database (privacy policy)";
  examples = ["delete-account"];

  exec(msg: Discord.Message, _: string[], client: Discord.Client) {
    msg.channel.send({
      embeds: [{
        color: Colors.WARNING,
        title: "Confirm Account Deletion",
        description: "Are you sure you want to delete your account?\n**ALL** your progress and data will be deleted!"
      }],
      components: [
        new ActionRowBuilder<ButtonBuilder>()
          .addComponents([
            new ButtonBuilder()
              .setCustomId("next")
              .setEmoji("✔️")
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId("cancel")
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
        if (choice.customId == "cancel") {
          collector.stop();
          await mesg.edit({
            embeds: [{
              color: Colors.PRIMARY,
              title: "Cancelled",
              description: "Happy coding!"
            }]
          });
          return;
        }

        const user = Database.pdb[msg.author.id];
        const channel = await client.channels.fetch("899518500576579615") as Discord.TextChannel;
        channel.send({
          embeds: [{
            color: Colors.PRIMARY,
            title: "Deleted Account",
            description: `User: \`${user.name}\`
ID: \`${msg.author.id}\``
          }]
        });

        delete Database.pdb[msg.author.id];
        msg.channel.send({
          embeds: [{
            color: Colors.PRIMARY,
            title: "Deleted account",
            description: "Goodbye! Come back soon!"
          }]
        });
      });

      collector.on("end", collected => {
        if (collected.size == 0) {
          mesg.edit({
            embeds: [{
              color: Colors.WARNING,
              title: "Cancelled",
              description: "You didn't make a response in time!"
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