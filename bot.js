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
     console.log(spl[2]);
     if(!kUser) return message.channel.send("Can't find user!");
     let kReason = spl[2];
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
     if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
     let kickChannel = message.guild.channels.find('name', "incidents");
     if(!kickChannel) return message.channel.send("Can't find incidents channel.");
     const kickEmbed = new Discord.RichEmbed()
     kickEmbed.setAuthor("Boneless Water", client.user.avatarURL);
     kickEmbed.setTitle("~Kick~");
     kickEmbed.setDescription("Oh no! Someone got kicked!");
     kickEmbed.setColor(0x00AE86);
     kickEmbed.addField("Kicked User", '${kUser} with ID ${kUser.id}');
     kickEmbed.addField("Kicked By", '<@${message.author.id}> with ID ${message.author.id}');
     kickEmbed.addField("Kicked In", message.channel);
     kickEmbed.addField("Time", message.createdAt);
     kickEmbed.addField("Reason", kReason);
     kickEmbed.setTimestamp();
     kickEmbed.setFooter("Made by my main man T1m#7219");
        
     message.guild.member(kUser).kick(kReason);
     console.log(kUser, kReason)
     kickChannel.send(kickEmbed);
    }
    if(spl[0] === "ban") {
     let bUser = message.guild.member(message.mentions.users.first());
     if(!bUser) return message.channel.send("Can't find user!");
     let bReason = spl[2];
     if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
     if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

     const embed = {
  "title": "~Ban~",
  "description": "Oh no! Someone got banned!",
  "color": 4903271,
  "footer": {
    "text": "Made by my man T1m#7219"
  },
  "author": {
    "name": "Boneless Water",
    "icon_url": "https://cdn.discordapp.com/attachments/314470306703998979/507223045136449536/52JC3VVE.png"
  },
  "fields": [
    {
      "name": "Kicked User",
      "value": "${kUser} with ID ${kUser.id}"
    },
    {
      "name": "Kicked By",
      "value": "<@${message.author.id}> with ID ${message.author.id}"
    },
    {
      "name": "Kicked In",
      "value": "${message.channel}",
      "inline": true
    },
    {
      "name": "Time",
      "value": "${message.createdAt}",
      "inline": true
    },
    {
      "name": "Reason",
      "value": "${kReason}",
      "inline": true
    }
  ]
};
        
     let incidentchannel = message.guild.channels.find('name', "incidents");
     if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

     message.guild.member(bUser).ban(bReason);
     incidentchannel.send({ embed });


     return;
    }
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
