const Discord = require('discord.js');

const client = new Discord.Client();
const fs = require("fs");

client.on('ready', () => {

    console.log('I am ready!');

});

const { Database } = require('pg');

const database = new Database({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

database.connect();


client.on('message', async message => { 
    if(message.author.bot) return;
    client.query("CREATE TABLE IF NOT EXISTS bkm (
	'id' int NOT NULL PRIMARY KEY,
	'bans' numeric(9,2),
	'kicks' numeric(9,2),
	'mutes' numeric(9,2)
);", (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
    });
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
     if client.query(`SELECT ${kUser}
FROM bkm;`)==='null' {
         client.query(`INSERT INTO bkm (id, bans, kicks, mutes)
    VALUES (${kUser.id}, 0, 1, 0);`, (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
         })
     };
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

    };
    if(spl[0] === "ban") {
     let bUser = message.guild.member(message.mentions.users.first());
     if(!bUser) return message.channel.send("Can't find user!");
     let bReason = spl[2];
     if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
     if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
     if client.query(`SELECT ${bUser}
FROM bkm;`)==='null'{
         client.query(`INSERT INTO bkm (id, bans, kicks, mutes)
    VALUES (${bUser.id}, 1, 0, 0);`, (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
         })
     };
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
     return;
    };
   if(spl[0]==="history"){
    let hUser = message.guild.member(message.mentions.users.first());
    if client.query(`SELECT ${hUser.id}
FROM bkm;`)==='null'{
         client.query(`INSERT INTO bkm (id, bans, kicks, mutes)
    VALUES (${hUser.id}, 0, 0, 0);`, (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
         })
     };
    let hBans = client.query(`SELECT bans
FROM bkm
WHERE ID=${hUser.id};`);
    let hKicks = client.query(`SELECT kicks
FROM bkm
WHERE ID=${hUser.id};`);
    let hMutes = client.query(`SELECT mutes
FROM bkm
WHERE ID=${hUser.id};`);
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
});

 

// THIS  MUST  BE  THIS  WAY
database.end();
client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
