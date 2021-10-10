const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "loop",
  aliases: ["l"],
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("gada queueueu").catch(console.error);

    // toggle from false to true and reverse
    // if (!queue.loop) queue.loop = true;
    // if (queue.loop) queue.loop = false;
    queue.loop = !queue.loop;
    var loopStatus;
    loopStatus = queue.loop ? "🟢 Loop Status: **" + queue.loop + "**" : "🔴 Loop Status: **" + queue.loop + "**"
    const loopEmbed = generateLoopEmbed(queue, loopStatus);
    return queue.textChannel
      .send(loopEmbed)
      .catch(console.error);
  }
};

function generateLoopEmbed(queue, loopStatus){
  const embed = new MessageEmbed()
  .setColor("#F8AA2A")
  .setDescription(
    `${loopStatus}`
  );
  return embed
}