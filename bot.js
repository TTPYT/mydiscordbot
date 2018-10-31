const Discord = require('discord.js');

const client = new Discord.Client();
var prefix = "b!"
 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => { 
    console.log(message.content)
    if(message.author.bot) return;
    if(message.content.indexOf("b1") !== 0) return;
    const args = message.content.slice(2).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command === "ping") {
     message.reply("Pong!");
    }
    
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
