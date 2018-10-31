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
     let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!tomute) return message.reply("Couldn't find user.");
     if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
     let muterole = message.guild.roles.find(`name`, "muted");
     if(!muterole){
      try{
       muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
       })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
      }catch(e){
       console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = spl[2];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));

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
     const embed = {
  "title": "~Kick~",
  "description": "Oh no! Someone got kicked!",
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
      "value": `${kUser} with ID ${kUser.id}`
    },
    {
      "name": "Kicked By",
      "value": `<@${message.author.id}> with ID ${message.author.id}`
    },
    {
      "name": "Kicked In",
      "value": `${message.channel}`,
      "inline": true
    },
    {
      "name": "Time",
      "value": `${message.createdAt}`,
      "inline": true
    },
    {
      "name": "Reason",
      "value": `${kReason}`,
      "inline": true
    }
  ]
};
        
     message.guild.member(kUser).kick(kReason);
     console.log(kUser, kReason)
     kickChannel.send({ embed });
    }
    if(spl[0] === "ban") {
     let bUser = message.guild.member(message.mentions.users.first());
     if(!bUser) return message.channel.send("Can't find user!");
     let bReason = spl[2];
     if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
     if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

     const embed = {
  "title": "~Ban~",
  "description": "Oops! That's a ban!",
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
      "name": "Banned User",
      "value": `${bUser} with ID ${bUser.id}`
    },
    {
      "name": "Banned By",
      "value": `<@${message.author.id}> with ID ${message.author.id}`
    },
    {
      "name": "Bannd In",
      "value": `${message.channel}`,
      "inline": true
    },
    {
      "name": "Time",
      "value": `${message.createdAt}`,
      "inline": true
    },
    {
      "name": "Reason",
      "value": `${bReason}`,
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
