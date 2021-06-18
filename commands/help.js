const discord = require('discord.js');
exports.run = async(client, message, args) => {
    const embed = new discord.MessageEmbed()
    .setTitle('<a:letsgo:781767861286469664> Pogs are here for you!')
    .addField('pog help', 'This menu!', true)
    .addField('pog enable', 'Enable system!', true)
    .addField('pog disable', 'Disable system!', true)
    .addField('pog pogs', 'Shows pog stats!', true)
    .addField('pog ping', 'See the bots ping!', true)
 
message.channel.send(embed).then(m => {
  m.react("781767861286469664")
})
};
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ['help']



};
exports.help = {
name: "yardım"
};