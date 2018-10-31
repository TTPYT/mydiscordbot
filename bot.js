const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => { 
    console.log(message)
    if(message.author.bot) return;
    const mes = message.content.toLowerCase();
    const res = mes.substring(0, 2);
    const spl = res.split(" ")
    if(res!== "b!") return;
    const mainmess = mes.substr(2);
    if(mainmess === "ping") {
     message.reply("Pong!");
    }
    if(spl[0] === "mute") {
     let mute_role = message.guild.roles.find("name", "Mute"); // this is where you can replace the role name
     let member = message.mentions.members.first();
     member.addRole(mute_role); // <- this assign the role
     setTimeout(() => {member.removeRole(mute_role);}, 60 * 1000);
     message.say("Forcechockes ${member} for 60 seconds.");
    }
    if(spl[0] === "kick") {
     var member= message.mentions.members.first();
        // Kick
        member.kick().then((member) => {
            // Successmessage
            message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
        }).catch(() => {
             // Failmessage
            message.channel.send("Access Denied");
        });
    }
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
