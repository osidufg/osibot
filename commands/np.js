const { MessageEmbed } = require("discord.js");
const { splitBar } = require("string-progressbar");

module.exports = {
    name: "np",
    aliases: ["nowplaying"],
    
    
    execute(message) {
      const queue = message.client.queue.get(message.guild.id);
      if (!queue) return message.channel.send("gada queueueu bg");
  
      const song = queue.songs[0];
      const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
      const left = song.duration - seek;
      console.log(seek);
      console.log(left);
  
      let nowPlaying = new MessageEmbed()
        .setTitle("**Now Playing**")
        .setThumbnail(`https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`)
        .setDescription(`**[${song.title}](${song.url})**`)
        .setColor("#F8AA2A")
  
      if (song.duration > 0) {
        nowPlaying.addField(
          "\u200b",
          "**" + new Date(seek * 1000).toISOString().substr(11, 8) + "** / **" +
            (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)) + "**",
          false
        );
        nowPlaying.setFooter(
          `Time Remaining: ${new Date(left * 1000).toISOString().substr(11, 8) }`
        );
      }
  
      return message.channel.send(nowPlaying);
    }
}