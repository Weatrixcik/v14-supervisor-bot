const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const cezapuan = require("../../../../Global/Database/cezapuan")
const penalty =require("../../../../Global/Database/ceza")
const bans = require("../../../../Global/Database/ban")
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")
class Ban extends Command {
    constructor(client) {
        super(client, {
            name: "Ban",
            description: "ID'si girilen kullanıcıyı sunucudan yasaklar.",
            usage: ".ban @weatrix/ID",
            category: "Moderasyon",
            aliases: ["yasakla","ban","sik","uçur","ucur","weatrixsikgeçortalığı"],
            enabled: true,
        });
    }
async onRequest (client, message, args, embed) {
    let roles = await Roles.findOne({guildID: message.guild.id})
    let channels = await Channel.findOne({guildID: message.guild.id})
if(
[roles.banhammer].some(x=> message.member.roles.cache.has(x))) {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return cevap(message,"memberYok")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return cevap(message,"yetersizYetki")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return cevap(message,"üstAynıYetki")
    var reason = args.splice(1).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    const ceza = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),Reason:reason, type:"BAN"}}},{upsert:true})
    await message.guild.members.ban(member.id, {reason:`${message.member.user.tag} Tarafından Yasaklandı!`})
    await message.reply({ embeds: [new EmbedBuilder().setColor("2F3136").setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.avatarURL({dynamic:true})
    }).setDescription(`${client.emojis.cache.find(x => x.name === "appEmoji_yes")} ${member} Kullanıcısı banlandı. \n "${member.id}" ID'li kullanıcı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) sunucudan yasaklandı!`).setImage("https://cdn.discordapp.com/attachments/1066294817878986782/1067039590818529290/00648c6786aedeaf2d9b401e17dc7fe7.gif")]})
     message.guild.channels.cache.get(channels.banlog)
    .send({embeds:[embed.setDescription(`${member} [\`${member.id}\`], Sunucudan Yasaklandı!`).addFields({name:`** **`,value:`\` ❯ \` **Yetkili:** ${message.member} [\`${message.member.user.tag} - ${message.member.id}\`]\n\` ❯ \`** Kullanıcı:** ${member} [\`${member.id}\`]\n\` ❯ \`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> [<t:${(Date.now() / 1000).toFixed()}:R>]\n\` ❯ \`**  Sebep:**\n \`\`\` ${reason} \`\`\``})]})
    await bans.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,banned:1},$push:{bans:{Punished:member.id, SentencingDate:Date.now(), Type:"BAN", Reason:reason}}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:member.id}, {$inc:{cezapuan:25}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
    if(message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(channels.penaltyPointsLog)
    .send({content:`**${member} Ceza puanın güncellendi!.** mevcut ceza puanın **${cezapuandata ? cezapuandata.cezapuan : 0}**`})
} else {return message.reply({content:"Bu komutu kullanmak için gerekli yetkilere veya rollere sahip değilsin."})}
}
}
module.exports = Ban;