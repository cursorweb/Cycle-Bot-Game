import "dotenv/config";
import { SlashCommandBuilder, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { load } from "../loader.js";


const token = process.env.TOKEN || "";
const clientId = process.env.CLIENT_ID || "";

const rest = new REST({ version: "10" }).setToken(token);

// node ... -d
if (process.argv.length == 3 && process.argv[2] == "-d") {
  try {
    await rest.put(Routes.applicationCommands(clientId), { body: [] });
    console.log("Successfully deleted all application commands.");
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
}

const cmds = await load();
const slashCmds: SlashCommandBuilder[] = [];

const names: string[] = [];

for (const topic in cmds) {
  for (const cmd of cmds[topic].cmds) {
    const slashCmd = new SlashCommandBuilder();
    if (names.includes(cmd.names[0])) {
      throw new Error(`duplicate: ${cmd.names[0]}`);
    }
    names.push(cmd.names[0]);
    slashCmd.setName(cmd.names[0]);
    slashCmd.setDescription(cmd.help);
    slashCmds.push(slashCmd);
  }
}

console.log(slashCmds.map(k => k.toJSON()));

rest.put(Routes.applicationCommands(clientId), { body: slashCmds.map(k => k.toJSON()) })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);