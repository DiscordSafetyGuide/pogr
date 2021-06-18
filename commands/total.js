const Discord = require("discord.js")
const { JsonDatabase } = require('wio.db');
const db = new JsonDatabase("pogs")

exports.run = async (client, message, args) => {

const userpogs = db.fetch(`pogs_${message.author.id}`)
const serverpogs = db.fetch(`pogs_${message.guild.id}`)
const globalpogs = db.fetch(`global`)

const embed = new Discord.MessageEmbed()
.addField(`Your Pogs: ${userpogs}`, "^^ Your Total Pogs")
.addField(`Server Pogs: ${serverpogs}`, "^^ Servers Total Pogs")
.addField(`Global Pogs: ${globalpogs}`, "^^ Global Pogs")

message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pogs"],
  permLevel: 0
};

exports.help = {
  name: 'pogs',
  description: 'Sends pog stats',
  usage: 'pog pogs'
}; 