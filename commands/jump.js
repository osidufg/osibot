const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "jump",
  aliases: ["j"],
  description: "jumps a queue",
  
  execute(message, args) {
    if (!args.length || isNaN(args[0]))
      return message
        .reply("yg bener woy")
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("yah gada yg mau diskip").catch(console.error);
    if (args[0] > queue.songs.length || args[0] < queue.songs.length)
      return message
        .reply("kebanyakan bro")
        .catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();
    const embedJump = generateJumpEmbed(message);
    queue.textChannel
      .send(`jumped ${args[0]-1} songs (${message.author} < nih yg ngejump)`)
      .catch(console.error);
  }
};

function generateJumpEmbed(message){
    const embed = new MessageEmbed()
    .setColor("#F8AA2A")
    .setDescription(
        `jumped ${args[0]-1} songs (${message.author} 👈 nih yg ngejump)`
    );
    return embed
  }