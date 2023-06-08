const { Collection, EmbedBuilder, PermissionsBitField,Formatters,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const inviteSchema = require("../../../../Global/Database/invite")
const Channel = require("../../../../Global/Database/Channel")
class MemberRemove extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberRemove",
            enabled: true,
        });
    }
    
 async onLoad(member) {

    let guildchannelconf = await Channel.findOne({guildID: member.guild.id})
    const invChannel = member.guild.channels.cache.get(guildchannelconf.inviteLog);
  if(!invChannel) return console.log("İnv Log kanalı Bulunamadı!")
  let fakeControl = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7

  let inviteUser = await inviteSchema.findOne({ guildID: member.guild.id, userID: member.id })
  let inviter = client.users.cache.get(inviteUser.inviter)
  const solOk = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_solOk")
  if(!inviter) {

      if(invChannel) invChannel.send({ content: `${solOk} **${member.user.tag}** <t:${Math.floor(Date.now() / 1000)}:R> sunucumuzdan ayrıldı, **ÖZEL URL** ile giriş yapmıştı. ${fakeControl === true ? "`❌`": ""}` })

  } else if(inviter.id === inviteUser.inviter) {
      await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { total: -1, regular: -1, leave: 1 } }, { upsert: true })
      const data = await inviteSchema.findOne({ guildID: member.guild.id, userID: inviter.id });
      const toplam = data.total+data.bonus 
      if(invChannel) invChannel.send({ content: `${solOk} **${inviter.tag}** (**${toplam+1}**) daveti ile sunucuya katılan ${solOk}  **${member.user.tag}**, <t:${Math.floor(Date.now() / 1000)}:R> sunucudan ayrıldı. kalan daveti: **${toplam}** `});
  
}
 }
}
module.exports = MemberRemove;