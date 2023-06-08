const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const cezapuan = require("../../../../Global/Database/cezapuan")
const penalty =require("../../../../Global/Database/ceza")
const vmute = require("../../../../Global/Database/vmute")
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")
class Unjail extends Command {
    constructor(client) {
        super(client, {
            name: "Unjail",
            description: "ID'si girilen kullanıcının metin ve ses kanallarındaki uzaklaştırmasını kaldırır.",
            usage: ".unjail @weatrix/ID <süre> <sebep>",
            category: "Moderasyon",
            aliases: ["unjail","af","cezakaldır","cezakaldir"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
    let roles = await Roles.findOne({guildID: message.guild.id})
    let channels = await Channel.findOne({guildID: message.guild.id})
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [roles.jailhammer].some(x=> message.member.roles.cache.has(x))){
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return  cevap(message,"memberYok")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return cevap(message,"yetersizYetki")
    var reason = args.splice(2).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    const data = await penalty.find();
    let cezakontrol = data.filter(x=> x.penaltys.some(x=> x.type == "JAIL" && x.Punished == member.id && x.Finished == false)).length < 0
    if(!member.roles.cache.has(roles.jailedRole) && cezakontrol) return message.reply({content:`**${member.user.tag}**, Aktif cezası bulunmadığı için bu işlem yapılamaz`})
    const ceza = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),Reason:reason, type:"UN-JAİL"}}},{upsert:true})
    
    await message.reply({content:`Susturma Açma (\`Unjail\`) İşlemi Başarılı! \n "${member.id}" ID'li kullanıcı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) metin kanallarında ki susturması açıldı!`})
    if(channels.jaillog !=undefined && message.guild.channels.cache.get(channels.jaillog)) message.guild.channels.cache.get(channels.jaillog)
    .send({embeds:[embed.setTitle(`#${ceza+1} Numaralı Yeni Ceza`).setDescription(`${member} (\`${member.id}\`), Sunucunun metin kanallarında bulunan susturması açıldı!`).addFields({name:`#${ceza+1} Numaraları Cezanin Detayları;`,value:`\`[•]\` **Yetkili:** ${message.member} (\`${message.member.user.tag} ▬ ${message.member.id}\`)\n\`[•]\`** Kullanıcı:** ${member} (\`${member.id}\`)\n\`[•]\`** İşlem:** Metin Kanallarında ki Susturma Kaldırıldı (Voice UnMute)\n\`[•]\`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> (<t:${(Date.now() / 1000).toFixed()}:R>)\n\`[•]\`**  Sebep:** ${reason}`})]})
    await vmute.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,unvmute:1},$push:{vmutes:{Punished:member.id, SentencingDate:Date.now(), Type:"UN-JAİL", Reason:reason,Finished:false}}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:member.id}, {$inc:{cezapuan:-10}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
    if(channels.penaltyPointsLog !=undefined && message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(channels.penaltyPointsLog)
    .send({content:`**${member} Ceza puanın güncellendi!** mevcut ceza puanın **${cezapuandata ? cezapuandata.cezapuan : 0}**`})
    await cezaç(message.guild,member,message.member)

} else return cevap(message,"komutKullanamazsın")
}
}
async function cezaç(guild,member,staff){
    let channels = await Channel.findOne({guildID: Guild.ID})
    let roles = await Roles.findOne({guildID: Guild.ID})
    await penalty.find({guildID:guild.id,userID:member.id}, async (err,data) => {
        data.filter(x=> x.penaltys.some(x=>x.type == "UN-JAIL" && x.Finished == false)).forEach(async veri => {
            veri.penaltys.forEach(async ceza => {
                await member.roles.set(ceza.roles)
                await penalty.findOneAndUpdate({guildID:guild.id,cezaId:veri.cezaId},{$set:{penaltys:{Staff:ceza.Staff, Punished:ceza.Punished,SentencingDate:ceza.SentencingDate,PenaltyEndTime:ceza.PenaltyEndTime,Finished:true,type:ceza.type,Reason:ceza.Reason}}},{upsert:true})
            })
       
        })
        if(channels.jaillog !=undefined && guild.channels.cache.get(channels.jaillog)) guild.channels.cache.get(channels.jaillog)
        .send({content:`${member}Metin ve Ses kanallarındaki uzaklaştırması ${staff} tarafından <t:${(Date.now() / 1000).toFixed()}:R> kaldırıldı.`})
        })
}
module.exports = Unjail;
