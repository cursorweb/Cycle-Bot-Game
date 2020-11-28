"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const Discord = __importStar(require("discord.js"));
const cmd_parser_1 = require("./cmd-parser");
const loader_1 = require("./loader");
const client = new Discord.Client();
client.on("ready", () => {
    client.user.setPresence({ activity: { name: "&help for help!", type: "PLAYING" }, status: "idle" });
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", (msg) => {
    let cmd = cmd_parser_1.parse("&", msg.content);
    if (msg.author.id == client.user.id || msg.author.bot || !cmd)
        return;
    if (msg.guild.id != "663057930144186391")
        return;
    msg.channel.send(`pardone, but your message was parsed as
**Command**: ${cmd.command}
**Args**: ${cmd.args.map(o => "'" + o + "'").join(", ")}`);
});
(async () => {
    console.log(await loader_1.help());
})();
client.login(process.env.TOKEN);
