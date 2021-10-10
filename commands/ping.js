const { MessageEmbed } = require ("discord.js");

module.exports = {
  name: "ping",
  cooldown: 10,
  description: "check latency",
  execute(message) {
    const embedPing = generatePingEmbed(message);
    message.channel
      .send(embedPing)
      .catch(console.error);
  }
};

function generatePingEmbed(message){
    const embed = new MessageEmbed()
    .setColor("#F8AA2A")
    .setDescription(
        `🕒 Latency: **${Math.round(message.client.ws.ping)}**`
    );
    return embed
  }