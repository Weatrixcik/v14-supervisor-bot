const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const cezapuan = require("../../../../Global/Database/cezapuan")
const penalty =require("../../../../Global/Database/ceza")
const vmute = require("../../../../Global/Database/vmute")
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")
class VoiceUnMute extends Command {
    constructor(client) {
        super(client, {
            name: "V-unmute",
            description: "ID'si girilen kullanıcının metin kanallarındaki susturmasını açar.",
            usage: ".vunmute @weatrix/ID <süre> <sebep>",
            category: "Moderasyon",
            aliases: ["unvmute","vunmute"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
    let roles = await Roles.findOne({guildID: message.guild.id})
    let channels = await Channel.findOne({guildID: message.guild.id})
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [roles.vmutehammer].some(x=> message.member.roles.cache.has(x))){
    const hataEmbed =  new EmbedBuilder()
    .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
    .setColor("Red")
    .setFooter({text: "Developed By weatrix | Hata olduğunu düşünüyorsan geliştirici ile iletişime geç!", iconURL: message.guild.members.cache.get(client.owners[0]).user.avatarURL({dynamic:true})});
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return  cevap(message,"memberYok")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return cevap(message,"yetersizYetki")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return cevap(message,"üstAynıYetki")
    var reason = args.splice(2).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    const data = await penalty.find();
    let cezakontrol = await data.filter(x=> x.penaltys.some(x=> x.type == "CHAT-MUTE" && x.Punished == member.id && x.Finished == false)).length < 0
    if(!member.roles.cache.has(roles.vmuterol) || cezakontrol) return message.reply({embeds:[hataEmbed.setDescription(`**[ __Hata__ ]** \` | \` **${member.user.tag}**, Aktif cezası bulunmadığı için bu işlem yapılamaz`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })
    if(member.voice.mute == false) return message.reply({content:`**${member.user.tag}** Ses kanallarında susturması bulunamadı.`})
    const ceza = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),Reason:reason, type:"CHAT-UNMUTE"}}},{upsert:true})
    
    await message.reply({content:`Susturma Açma (\`Chat UnMute\`) İşlemi Başarılı! \n "${member.id}" ID'li kullanıcı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) metin kanallarında ki susturması açıldı!`})
    message.guild.channels.cache.get(channels.vmutelog)
    .send({embeds:[embed.setDescription(`${member} (\`${member.id}\`), Sunucunun metin kanallarında bulunan susturması açıldı!`).addFields({name:`** **`,value:`\` ❯ \` **Yetkili:** ${message.member} [\`${message.member.user.tag} - ${message.member.id}\`]\n\` ❯ \`** Kullanıcı:** ${member} [\`${member.id}\`]\n\` ❯ \`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> [<t:${(Date.now() / 1000).toFixed()}:R>]\n\` ❯ \`**  Sebep:**\n\`\`\` ${reason} \`\`\``})]})
    await vmute.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,unvmute:1},$push:{vmutes:{Punished:member.id, SentencingDate:Date.now(), Type:"C-UNMUTE", Reason:reason,Finished:false}}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:member.id}, {$inc:{cezapuan:-10}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
    if(channels.penaltyPointsLog !=undefined && message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(channels.penaltyPointsLog)
    .send({content:`**${member} Ceza puanın güncellendi!** mevcut ceza puanın **${cezapuandata ? cezapuandata.cezapuan : 0}**`})
    await cezaç(message.guild,member,message.member)

} else {return message.reply({content:"Bu komutu kullanmak için gerekli yetkilere veya rollere sahip değilsin."})}
}
}
async function cezaç(guild,member,staff){
    let roles = await Roles.findOne({guildID: Guild.ID})
    let channels = await Channel.findOne({guildID: Guild.ID})
    await penalty.find({guildID:guild.id,userID:member.id}, async (err,data) => {
        data.filter(x=> x.penaltys.some(x=>x.type == "VOICE-MUTE" && x.Finished == false)).forEach(async veri => {
            veri.penaltys.forEach(async ceza => {
                if((roles && roles.vmuterol) && member.roles.cache.has(roles.vmuterol)) member.roles.remove(roles.vmuterol)
                if(member && member.voice.mute == true) await member.voice.setMute(false);
                await penalty.findOneAndUpdate({guildID:guild.id,cezaId:veri.cezaId},{$set:{penaltys:{Staff:ceza.Staff, Punished:ceza.Punished,SentencingDate:ceza.SentencingDate,PenaltyEndTime:ceza.PenaltyEndTime,Finished:true,type:ceza.type}}},{upsert:true})
            })
       
        })
        if(channels.vmutelog !=undefined && guild.channels.cache.get(channels.vmutelog)) guild.channels.cache.get(channels.vmutelog)
        .send({content:`${member} Ses kanallarındaki susturması ${staff} tarafından <t:${(Date.now() / 1000).toFixed()}:R> kaldırıldı.`})
        })
}
module.exports = VoiceUnMute;