const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const { JsonDatabase } = require('wio.db');
const db = new JsonDatabase("pogs")

const total = db.fetch(`global`)

module.exports = client => {
  client.user.setStatus("idle");
  var oyun = [
    `pog help | ${client.users.cache.size} poggers!`  
  ];

  setInterval(function() {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);

    client.user.setActivity(`pog help | ${total} pogs!`);
  }, 2 * 2500);
};
 