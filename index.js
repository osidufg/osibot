const { Client, Collection } = require("discord.js");
const Discord = require ("discord.js")
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");

// import { Client, Collection } from "discord.js";
// import { readdirSync } from "fs";
// import { join } from "path";
// import { TOKEN, PREFIX } from "./config.json";

const client = new Client({
    disableMentions: "everyone",
    restTimeOffset: 0
  });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

client.on("ready", () => {
    console.log(`${client.user.username} is ready!`);
    client.user.setActivity(`${PREFIX}play`, { type: "LISTENING" });
  });
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
// const commandFiles = readdirSync(join(__dirname, "es6commands")).filter((file) => file.endsWith(".js"));
// commandFiles.push("../es6commands/" + commandFilesEs6);
//console.log (commandFiles)
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}


client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
  
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
  
    const [, matchedPrefix] = message.content.match(prefixRegex);
  
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
  
    const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    
    
    const toxic = [
      "lah gajelas", "elah gatau saya bg", "gjls."
    ];
    const randomToxic = Math.floor(Math.random() * toxic.length);
    //if (command == "help") return message.channel.send("blm ada help bg hehe tanya owner bot nya aja")
    if (!command) return message.channel.send(toxic[randomToxic] +
      "\nhehe bercanda");
  
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }
    try {
        command.execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply("ada error ni. host cek console dong").catch(console.error);
      }
});