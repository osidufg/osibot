const { play } = require ("../include/play.js");
const ytdl = require ("ytdl-core");
const YoutubeAPI = require ("simple-youtube-api");
const { YOUTUBE_API_KEY, VOLUME } = require ("../config.json");
const { MessageEmbed } = require("discord.js");

// import { play } from "../include/play.js";
// import ytdl from "ytdl-core";
// import YoutubeAPI from "simple-youtube-api";
// import { YOUTUBE_API_KEY } from "../config.json";
// import { MessageEmbed } from "discord.js";

const youtube = new YoutubeAPI(YOUTUBE_API_KEY);

// class play{
// constructor (client){
//   super(client, {
//   name: "play",
//   aliases: ["p"],
//   description: "play music from youtube",
// })
// }}
module.exports = {
    name: "play",
    aliases: ["p"],
    description: "play music from youtube",
    
    async execute (message, args){
        const { channel } = message.member.voice;
        const serverQueue = message.client.queue.get(message.guild.id);
        
        if (!channel) return message.channel.send("lol bgt gada di voice channel");
        
        if (serverQueue && channel != message.guild.me.voice.channel)
            return message
            .reply("sini dulu bos baru req lagu")
            .catch (console.error);
        
        if (!args.length)
            return message.channel.send("mau play apa bray")
        
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return message
        .reply("gabisa join lah gimana mau ngeDJ kalo gitu");
        if (!permissions.has("SPEAK")) return message
        .reply("gabisa ngomong lah gimana mau ngeDJ kalo gitu");

        const search = args.join(" ");
        const ytPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        //const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
        //const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
        //const mobileScRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/;
        const url = args[0];
        const urlValid = ytPattern.test(args[0]);

        //redirect to playlist
        // if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
        //     return message.client.commands.get("playlist").execute(message, args);
        //  }
        
        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: VOLUME,
            muted: false,
            playing: true
        };
        
        let songInfo = null;
        let song = null;

        if (urlValid) {
            try {
              songInfo = await ytdl.getInfo(url);
              song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                duration: songInfo.videoDetails.lengthSeconds,
                id: songInfo.videoDetails.videoId,
              };
            } catch (error) {
              console.error(error);
              return message.reply(error.message).catch(console.error);
            }
        }else {
            try {
              const results = await youtube.searchVideos(search, 1, { part: "snippet" });
      
              if (!results.length) {
                message.reply(`waduh gatau tuh ${search} apaan`).catch(console.error);
                return;
              }
      
              songInfo = await ytdl.getInfo(results[0].url);
              song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                duration: songInfo.videoDetails.lengthSeconds,
                id: songInfo.videoDetails.videoId,
              };
            } catch (error) {
              console.error(error);
              return message.reply(error.message).catch(console.error);
            }
          }
        const embedAdded = generateAddedEmbed(message, song);

        if (serverQueue) {
            serverQueue.songs.push(song);
            return serverQueue.textChannel
              .send(embedAdded)
              .catch(console.error);
          }
        queueConstruct.songs.push(song);
        message.client.queue.set(message.guild.id, queueConstruct);
      
        try {
            queueConstruct.connection = await channel.join();
            await queueConstruct.connection.voice.setSelfDeaf(true);
            play(queueConstruct.songs[0], message);
        } catch (error) {
            console.error(error);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return message.channel.send(`gajadi join dah soalnya \n >>> ${error} `).catch(console.error);
        }
        //debug bentar hehe
        //console.log(`${song.id}`);
    }
}

// export {execute as play}
 
function generateAddedEmbed(message, song) {
  var dur;
  if (Math.floor(song.duration/3600) == 0 && Math.floor(song.duration/60) == 0 && song.duration % 60 == 0){
    dur = "◉ LIVE";
  } else{
    dur = `${('0'+Math.floor(song.duration/3600)).slice(-2)}:${('0'+Math.floor(song.duration/60)).slice(-2)}:${('0'+song.duration % 60).slice(-2)}`;
  }
  const embed = new MessageEmbed()
    .setTitle("**Added to Queue**")
    //.setThumbnail(`https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`)
    .setColor("#F8AA2A")
    .setDescription(
      `**[${song.title}](${song.url})**\nDuration: **${dur}**\nBy ${message.author}`);
return embed;
}
