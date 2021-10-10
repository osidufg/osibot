

module.exports = {
    name: "knp",
    aliases: ["kenapa", "?"],

    execute(message){
      const name = getUserFromMention(message);
      const knp = [
        "?? knp bg <@" + name + ">", "? <@" + name + ">", "ha <@" + name + ">", "apa <@" + name + ">"
      ];
      const randomKnp = Math.floor(Math.random() * knp.length);
      return message.channel.send(knp[randomKnp]);
    }
}

function getUserFromMention(message) {
  const args = message.content.split(" ")
    for (let i = 1 ; i < args.length ; i++){
      if (args[i].startsWith('<@') && args[i].endsWith('>')) {
          mention = args[i].slice(3, -1);
    return mention;
  }
    }
}