const Discord = require('discord.js');

const client = new Discord.Client();
const aws = require('aws-sdk');

var BKM = new aws.S3({
  accessKeyId: process.env.BKM,
});

client.on('ready', () => {

    console.log('I am ready!');
    

});

client.on('message', async message => { 
    if(message.author.bot) return;
    console.log(message.content)
    const mes = message.content.toLowerCase();
    const res = mes.substring(0, 2);
    if(res!== "b!") return;
    const mainmess = mes.substr(2);
    const spl = mainmess.split(" ");
    if(mainmess === "ping") {
     message.reply("Pong!");
    };
    console.log(spl,spl[0])
    if(spl[0] === "purge") {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        const deleteCount = parseInt(spl[1], 10)+1;
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    };
    if(spl[0] === "kick") {
     console.log("A KICK??");
     let kUser = message.guild.member(message.mentions.users.first());
     if(!kUser) return message.channel.send("Can't find user!");
     let kReason = spl.slice(2);
     console.log(kReason);
     if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No can do pal!");
     if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");
     let kickChannel = message.guild.channels.find('name', "incidents");
     if(!kickChannel) return message.channel.send("Can't find incidents channel.");
     const embed = {
  "title": "~Kick~",
  "description": "Oh no! Someone got kicked!",
  "color": 4903271,
  "footer": {
    "text": "Made by my man T1m#7219"
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
     var kUserID = kUser.id;
     if (BKM[kUserID] === undefined){
        BKM[kUserID] = [0,1,0];
     } else {
        BKM[kUserID][1]=BKM[kUserID][1]+1;
     };
    };
    if(spl[0] === "ban") {
     let bUser = message.guild.member(message.mentions.users.first());
     if(!bUser) return message.channel.send("Can't find user!");
     let bReason = spl.slice(2);
     if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
     if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be kicked!");
     const embed = {
  "title": "~Ban~",
  "description": "Oops! That's a ban!",
  "color": 4903271,
  "footer": {
    "text": "Made by my man T1m#7219"
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
      "name": "Banned In",
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
     var bUserID = bUser.id;
     if (BKM[bUserID] === undefined){
        BKM[bUserID] = [1,0,0];
     }else {
        BKM[bUserID][0]=BKM[bUserID][0]+1;
     };
     return;
    };
   if(spl[0]==="history"){
    let hUser = message.guild.member(message.mentions.users.first());
    var hUserID=hUser.id;
    if (BKM[hUserID] === undefined){
        BKM[hUserID] = [0,0,0];
        console.log("creating history")
        console.log(BKM)
     };
     var hBans = BKM[hUserID][0];
     var hKicks = BKM[hUserID][1];
     var hMutes = BKM[hUserID][2];
    const embed = {
  "title": "~History~",
  "description": "Oooh! Who's been naughty?",
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
      "name": "History of User",
      "value": `${hUser} with ID ${hUser.id}`
    },
    {
      "name": "Bans",
      "value": `${hBans}`,
      "inline": true
    },
    {
      "name": "Kicks",
      "value": `${hKicks}`,
      "inline": true
    },
    {
      "name": "Mutes",
      "value": `${hMutes}`,
      "inline": true
    }
  ]
};
    
    message.channel.send({ embed });
   };
   if(spl[0]==="mute") {
    let tomute = message.guild.member(message.mentions.users.first());
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MUTE_MEMBERS")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
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
  message.reply(`<@${tomute.id}> has been muted for ${mutetime} minutes`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, mutetime*60000);
     var tomuteID = tomute.id;
     if (BKM[tomuteID] === undefined){
        BKM[tomuteID] = [0,0,1];
     } else {
        BKM[tomuteID][1]=BKM.tomuteID[2]+1;
     };
   };
  if(spl[0]==="help") {
      const embed = {
  "title": "~Help~",
  "description": "Awwww. Does someone need help?",
  "color": 4903271,
  "footer": {
    "text": "Made by my man T1m#7219"
  },
  "fields": [
    {
      "name": "Ban {@user}",
      "value": "Bans someone (duh)",
       "inline": true
    },
    {
      "name": "Kick {@user}",
      "value": "Kicks someone (obviously)",
       "inline": true
    },
    {
      "name": "Mute {@user} {time}",
      "value": "Mutes someone for a time (you getting it yet?)",
      "inline": true
    },
    {
      "name": "Purge {number of messages}",
      "value": "Removes {number of messages} messages",
      "inline": true
    },
    {
      "name": "History {@user}",
      "value": "Shows the bans, kicks, and mutes of the user",
      "inline": true
    },
    {
      "name": "Prefix",
      "value": "BTW the prefix is b! or B!",
      "inline": true
    }
  ]
};
  message.channel.send({ embed });
  };
});

 

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
