const { MessageEmbed } = require ("discord.js");
// import { MessageEmbed } from "discord.js";

module.exports = {
    name: "queue",
    aliases: ["q"],
    description: "displays queueu",

    async execute (message){
        const permissions = message.channel.permissionsFor(message.client.user);
        if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"]))
            await message.channel.send("Missing Permissions: MANAGE_MESSAGES, ADD_REACTIONS\n\n(ga bisa pindah page)");
        
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("gada queueueu ges");
        
        let currentPage = 0;
        const embeds = generateQueueEmbed(queue.songs);

        const queueEmbed = await message.channel.send(
            `**Page: ${currentPage + 1}/${embeds.length}**`,
            embeds[currentPage]
          );
          
        try {
          await queueEmbed.react("⬅️");
          await queueEmbed.react("⏹");
          await queueEmbed.react("➡️");
        } catch (error) {
          console.error(error);
          message.channel.send(error.message).catch(console.error);
        }

        const filter = (reaction, user) =>
        ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
        const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });
        collector.on("collect", async (reaction, user) => {
            try {
              if (reaction.emoji.name === "➡️") {
                if (currentPage < embeds.length - 1) {
                  currentPage++;
                  queueEmbed.edit(
                    `**Page: ${currentPage + 1}/${embeds.length}**`,
                    embeds[currentPage]
                  );
                }
              } else if (reaction.emoji.name === "⬅️") {
                if (currentPage !== 0) {
                  --currentPage;
                  queueEmbed.edit(
                    `**Page: ${currentPage + 1}/${embeds.length}**`,
                    embeds[currentPage]
                  );
                }
              } else {
                collector.stop();
                reaction.message.reactions.removeAll();
              }
              await reaction.users.remove(message.author.id);
            } catch (error) {
              console.error(error);
              return message.channel.send(error.message).catch(console.error);
            }
          });  
    }
};

function generateQueueEmbed(queue) {
    let embeds = [];
    let k = 10;
  
    for (let i = 0; i < queue.length; i += 10) {
      const current = queue.slice(i, k);
      let j = i;
      k += 10;
  
      const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n");
  
      const embed = new MessageEmbed()
        .setTitle("Song Queue\n")
        .setThumbnail(`https://i.ytimg.com/vi/${queue[0].id}/hqdefault.jpg`)
        .setColor("#F8AA2A")
        .setDescription(
          `**Current Song - [${queue[0].title}](${queue[0].url})**\n\n${info}`)
        //.setTimestamp();
      embeds.push(embed);
    }
  
    return embeds;
  }