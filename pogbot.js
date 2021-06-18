const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone: true
});
const config = require('./config.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const disbut = require('discord-buttons')(client);
const { JsonDatabase } = require('wio.db');
const db = new JsonDatabase("pogs")
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

const app = express();

var prefix = config.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} files going to be loaded.`);
    files.forEach(f => {
        let props = require(`./commands/${f}`);
        log(`Loaded command: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === config.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.TOKEN);

client.on('message', (message) => {
 if (message.content.toLowerCase().includes('pog')) {
   const ayar = db.fetch(`enabled_${message.guild.id}`)
   if (ayar === "true") {
   db.add(`pogs_${message.author.id}`, 1)
   db.add(`pogs_${message.guild.id}`, 1)
   db.add(`global`, 1)
   message.react("847036773963268117")
 
   } else {
     return; }
   
 }})

client.on('message', (message) => {
  if (message.author.id !== "515548625682694169") return;
                                                   
   if (message.content.toLowerCase().includes('!buton')) {
     const disbut = require("discord-buttons")
     let button = new disbut.MessageButton()
  .setStyle('url') //default: blurple
  .setLabel('Show me example!') //default: NO_LABEL_PROVIDED
  .setID('url') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
  .setURL("https://example.com")

message.channel.send('Redirect to => https://example.com', button);
 }})