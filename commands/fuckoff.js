

module.exports = {
    name: "fuckoff",
    aliases: ["stfu", "bacot"],
    
    async execute (message, args){
        const { channel } = message.member.voice;
    
        if (!channel) return message.channel.send("lol bgt gada di voice channel");
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("gada queueueu bg. tar gua leave sendiri");

        message.react('🖕');
        message.channel.send("yaudh bye.");
        
        queue.songs = [];
        queue.connection.dispatcher.end();
        message.client.queue.delete(message.guild.id);
        queue.channel.leave();
    }
}