const Discord = require('discord.js');
const client = new Discord.Client();
const Levels = require('discord-xp');

Levels.setURL("MONGO-URL")

client.login("BOT-TOKEN");

client.on('ready', () => {
    console.log("Bot is online!")
    client.user.setPresence({
        activity: {
          name: `made by Luxa#1350`,
          type: "PLAYING"
        },
        status: 'online'
      })
})

client.on("message", async message => {
    if (!message.guild) return;
    if (message.author.client) return;

    const prefix = ".";

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const randomXp = Math.floor(Math.random() * 9) + 1; 
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Congratulations, you have leveled up to level **${user.level}**! 🎉`);
    }
    
    if(command === "rank") {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You are currently level **${user.level}**! ✨`);
    }
})

