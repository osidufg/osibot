

module.exports = {
    name: "parah",

    execute(message){
      const name = getUserFromMention(message);
      if (!name) return message.reply("siapa bg yang parah? tag orangnya dong")
      return message.channel.send(
        "wah <@" + name + "> parah lu"
      );
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