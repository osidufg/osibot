
module.exports = {
    name: "leave",
    //aliases: ["fuckoff", "cabut"],
    
    async execute (message, args){
        const { channel } = message.member.voice;
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!channel) return message.channel.send("lol bgt gada di voice channel");
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("gada queueueu bg. tar gua leave sendiri");
        message.react('👋');
        
        queue.songs = [];
        queue.connection.dispatcher.end();
        message.client.queue.delete(message.guild.id);
        queue.channel.leave();
    }
}

