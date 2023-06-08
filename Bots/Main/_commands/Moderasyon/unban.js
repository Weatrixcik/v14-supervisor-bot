const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const cezapuan = require("../../../../Global/Database/cezapuan")
const penalty =require("../../../../Global/Database/ceza")
const bans = require("../../../../Global/Database/ban")
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")
class unBan extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            description: "ID'si girilen kullanıcının yasağını kaldırır.",
            usage: ".unban ID",
            category: "Moderasyon",
            aliases: ["unban","bankaldır"],

            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
    let roles = await Roles.findOne({guildID: message.guild.id})
    let channels = await Channel.findOne({guildID: message.guild.id})
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [roles.banhammer].some(x=> message.member.roles.cache.has(x))){
        const hataEmbed =  new EmbedBuilder()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setColor("Red")
    const id = args[0];
    var reason = args.splice(1).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    if(!id) return  message.reply({embeds:[hataEmbed.setDescription(`**[ __Hata__ ]** \` | \` Yasağını kaldırmak istediğiniz kullanıcının ID'sini girmeniz gerekiyor.`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })
    if(!message.guild.bans.fetch(id)) return message.reply({embeds:[hataEmbed.setDescription(`**[ __Hata__ ]** \` | \` ID'si girilen kullanıcının yasağı bulunamadı.`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })
    if(message.guild.bans.fetch(id)) {
    const cezaId = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:id,  cezaId: cezaId+1}, {$set:{penaltys:{Staff:message.member.id, Punished:id, SentencingDate:Date.now(),Reason:reason, type:"UNBAN"}}},{upsert:true})
    await message.guild.members.unban(id, {reason:`Yasak ${message.member.user.tag} Tarafından Kaldırıldı!`})
    await message.reply({content:`${client.emojis.cache.find(x => x.name === "appEmoji_tik")} Ban Kaldırma İşlemi Başarılı! \n "${id}" ID'li kullanıcının yasağı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) kaldırıldı!`})
     message.guild.channels.cache.get(channels.banlog)
    .send({embeds:[
        embed
        .setDescription(`<@${id}> (\`${id}\`), Mevcut yasaklandırması kaldırıldı!`)
        .addFields({name:`** **`,value:`\` ❯ \` **Yetkili:** ${message.member} [\`${message.member.user.tag} - ${message.member.id}\`]\n\` ❯ \`** Kullanıcı: **<@${id}> [\`${id}\`]\n\` ❯ \`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> [<t:${(Date.now() / 1000).toFixed()}:R>]\n\` ❯ \`** Sebep:**\n\`\`\` ${reason} \`\`\``})]})
    await bans.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,unban:1},$push:{bans:{Punished:id, SentencingDate:Date.now(), Type:"UNBAN", Reason:reason }}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:id}, {$inc:{cezapuan:-25}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:id})
    if(channels.penaltyPointsLog !=undefined && message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(roles.penaltyPointsLog)
    .send({content:`**<@${id}> Ceza puanın güncellendi!.** mevcut ceza puanın **${cezapuandata ? cezapuandata.cezapuan : 0}**`})
    }
} else {return message.reply({content:"Bu komutu kullanmak için gerekli yetkilere veya rollere sahip değilsin."})}
}
}
module.exports = unBan;