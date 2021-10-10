const { MessageEmbed } = require("discord.js");
const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;

module.exports = {
  name: "remove",
  aliases: ["r", "rm"],
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.channel.send("gada queueueu").catch(console.error);
    if (!args.length) return message.reply(`pake nya kek gini, ${PREFIX} + <queue number>`);

    const arguments = args.join("");
    const songs = arguments.split(",").map((arg) => parseInt(arg));
    let removed = [];
   



    if (pattern.test(arguments)) {
      queue.songs = queue.songs.filter((item, index) => {
        if (songs.find((songIndex) => songIndex - 1 === index)) removed.push(item);
        else return true;
      });

      const rmed = removed.map((song) => song.title).join("\n");
      const embedRemove = generateRemoveEmbed(message, rmed);
      queue.textChannel.send(
        embedRemove
        // i18n.__mf("remove.result", {
        //   title: removed.map((song) => song.title).join("\n"),
        //   author: message.author.id
        // })
      );
    } else if (!isNaN(args[0]) && args[0] >= 1 && args[0] <= queue.songs.length) {
      console.log("we got elsed!");
      const rmed1 = queue.songs.splice(args[0] - 1, 1)[0].title;
      const embedRemove1 = generateRemoveEmbed1(message, rmed1);
      return queue.textChannel.send(
        embedRemove1
        // `Removed ${queue.songs.splice(args[0] - 1, 1)[0].title}\n(${message.author} 👈 nih yg remove)`
        // i18n.__mf("remove.result", {
        //   title: queue.songs.splice(args[0] - 1, 1)[0].title,
        //   author: message.author.id
        // })
      );
    } else {
      console.log("we got the last one");
      return message.reply(`pake nya kek gini, ${PREFIX} + <queue number>`);
    }
  }
};

function generateRemoveEmbed(message, rmed){
    const embed = new MessageEmbed()
    .setColor("#F8AA2A")
    .setDescription(
        `❌ Removed **${rmed}**\n${message.author} 👈 nih yg remove`
    );
    return embed
  }
  
function generateRemoveEmbed1(message, rmed1){
    const embed = new MessageEmbed()
    .setColor("#F8AA2A")
    .setDescription(
        `❌ Removed **${rmed1}**\n${message.author} 👈 nih yg remove`
    );
    return embed
}