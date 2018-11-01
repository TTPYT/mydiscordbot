const Discord = require('discord.js');

const client = new Discord.Client();
const fs = require("fs");
let bkm = JSON.parse(fs.readFileSync("./bkm.json", "utf8"));

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
    }
    console.log(spl,spl[0])
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
     if (!bkm[kUser.id]) bkm[kUser.id] = {
        Bans: 0,
        Kicks: 0,
        Mutes: 0
    };
     let userDatas = bkm[kUser.id];
     userDatas.kicks++;
        fs.writeFile("./levels.json", JSON.stringify(levels), (err) => {
        if (err) console.error(err)
    });

    };
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

     if (!bkm[bUser.id]) bkm[bUser.id] = {
        Bans: 0,
        Kicks: 0,
        Mutes: 0
    };
     let userDatas = bkm[bUser.id];
     userDatas.bans++;
   fs.writeFile("./bkm.json", JSON.stringify(bkm), (err) => {
        if (err) console.error(err)
    });
     return;
    };
   if(spl[0]==="history"){
    let hUser = message.guild.member(message.mentions.users.first());
    if (!bkm[hUser.id]) bkm[hUser.id] = {
        Bans: 0,
        Kicks: 0,
        Mutes: 0
    };
    let userDatas = bkm[hUser.id];
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
      "value": `${userDatas.bans}`,
      "inline": true
    },
    {
      "name": "Kicks",
      "value": `${userDatas.kicks}`,
      "inline": true
    },
    {
      "name": "Mutes",
      "value": `${userDatas.mutes}`,
      "inline": true
    }
  ]
};
    
    message.channel.send({ embed });
   };
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
