const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  async execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("gada queueueu bg").catch(console.error);

    let lyrics = null;
    const title = queue.songs[0].title;
    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `gatau bro ${title} gada liriknya`;
    } catch (error) {
      //lyrics = `gatau bro ${title} gada liriknya`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`Lyrics for ${title}`)
      .setDescription(lyrics)
      .setColor("#F8AA2A")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
