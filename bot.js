const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => { 
    console.log(message.content)
    if(message.author.bot) return;
    const mes = message.content.toLowerCase();
    const res = mes.substring(0, 2);
    if(res!== "b!") return;
    const mainmess = mes.substr(2);
    const spl = mainmess.split(" ");
    if(mainmess === "ping") {
     message.reply("Pong!");
    }
    console.log(spl,spl[0])
    if(spl[0] === "mute") {
     let mute_role = message.guild.roles.find("name", "Mute"); // this is where you can replace the role name
     let member = message.mentions.members.first();
     member.addRole(mute_role); // <- this assign the role
     setTimeout(() => {member.removeRole(mute_role);}, 60 * 1000);
     message.say("Forcechockes ${member} for 60 seconds.");
    }
    if(spl[0] === "kick") {
     console.log("A KICK??");
     let kUser = message.guild.member(message.mentions.users.first());
     console.log(kUser);
     if(!kUser) return message.channel.send("Can't find user!");
     let kReason = spl[2];
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
     if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

     let kickEmbed = new Discord.RichEmbed()
     .setDescription("~Kick~")
     .setColor("#e56b00")
     .addField("Kicked User", '${kUser} with ID ${kUser.id}')
     .addField("Kicked By", '<@${message.author.id}> with ID ${message.author.id}')
     .addField("Kicked In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", kReason);

     let kickChannel = message.guild.channels.find('name', "incidents");
     if(!kickChannel) return message.channel.send("Can't find incidents channel.");

     message.guild.member(kUser).kick(kReason);
     kickChannel.send(kickEmbed);
    }
    if(spl[0] === "ban") {
     let bUser = message.guild.member(message.mentions.users.first());
     if(!bUser) return message.channel.send("Can't find user!");
     let bReason = spl[2];
     if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
     if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

     let banEmbed = new Discord.RichEmbed()
     .setDescription("~Ban~")
     .setColor("#bc0000")
     .addField("Banned User", '${bUser} with ID ${bUser.id}')
     .addField("Banned By", '<@${message.author.id}> with ID ${message.author.id}')
     .addField("Banned In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", bReason);

     let incidentchannel = message.guild.channels.find('name', "incidents");
     if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

     message.guild.member(bUser).ban(bReason);
     incidentchannel.send(banEmbed);


     return;
    }
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
