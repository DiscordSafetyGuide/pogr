const Discord = require("discord.js")
const { JsonDatabase } = require('wio.db');
const db = new JsonDatabase("pogs")

exports.run = async (client, message, args) => {
  
  const check = await db.fetch(`enabled_${message.guild.id}`)
  
  message.channel.send(`<a:Loading:846270076402532372> Awaiting database reaction...`).then(msg => {
    if(check === "false") {
      
      setTimeout(function (){

    msg.edit(`<:offline:846270076734275664> System is already closed!`) 

}, 2000)
 
    
    } else {
   db.set(`enabled_${message.guild.id}`, "false")
    setTimeout(function (){

    msg.edit("<:allow:846270077543645204> Success!")

}, 5000)
  }})
   
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['close'],
 permLevel: 0
};
 
exports.help = {
 name: 'disable',
 description: 'disables system',
 usage: 'pog disable'
};