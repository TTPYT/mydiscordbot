const Discord = require('discord.js');

const client = new Discord.Client();
var prefix = "b!"
 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => { 
    console.log(message)
    if(message.author.bot) return;
    const mes = message.content.toLowerCase();
    const res = mes.substring(0, 2);
    if(res!== "b!") return;
    const mainmess = mes.substr(2);
    if(mainmess === "ping") {
     message.reply("Pong!");
    }
    
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
