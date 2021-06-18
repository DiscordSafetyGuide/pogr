const ayarlar = require("../config.json");
module.exports = async message => {
  let client = message.client;
 
  if (message.author.bot) return;
  let prefix = 'pog'
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[1].slice(0);
  let params = message.content.split(' ').slice(2);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};