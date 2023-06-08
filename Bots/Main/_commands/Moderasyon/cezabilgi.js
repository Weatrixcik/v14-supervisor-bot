const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const penalty =require("../../../../Global/Database/ceza")
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")
class Cezabilgi extends Command {
    constructor(client) {
        super(client, {
            name: "Cezabilgi",
            description: "ID'si girilen ceza bilgilerini gösterir.",
            usage: ".cezabilgi CezaID",
            category: "Moderasyon",
            aliases: ["cb","cezabilgi"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
    let roles = await Roles.findOne({guildID: message.guild.id})
    let channels = await Channel.findOne({guildID: message.guild.id})
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [roles.botcommands].some(x=> message.member.roles.cache.has(x))){
      const hataEmbed =  new EmbedBuilder()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setColor("Red")
    let cezaID = args[0]
    if(!cezaID || !Number(cezaID)) return message.reply({embeds:[hataEmbed.setDescription(`**[ __Hata__ ]** \` | \` Lütfen sayı olucak şekilde tekrar deneyiniz. (\`.cezabilgi 31\`)`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })     
    const data = await penalty.findOne({guildID:message.guild.id,cezaId:cezaID})
    let a = await penalty.countDocuments().exec();
    if(!data) return message.reply({embeds:[hataEmbed.setDescription(`**[ __Hata__ ]** \` | \` Girilen ceza id'sine ait veriler bulunamadı. Toplam **${a}** ceza id'si bulunuyor.`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })
    message.reply({embeds:[
        new EmbedBuilder()
        .setAuthor({name:message.guild.id, iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**#${cezaID}**, Numaralı cezanin detayları aşağıda verilmiştir.`)
        .addFields({name:"** **",value:
`
\` ❯ \` **Yetkili:** <@${data.penaltys[0].Staff}> - (\`${data.penaltys[0].Staff}\`)
\` ❯ \` **Kullanıcı:** <@${data.penaltys[0].Punished}> - (\`${data.penaltys[0].Punished}\`)
\` ❯ \` **Cezası:** ${data.penaltys[0].type}
\` ❯ \` **Durum:** ${data.penaltys[0].Finished == true ? "Bitmiş":`<t:${(data.penaltys[0].PenaltyEndTime/1000).toFixed()}:R>`}
\` ❯ \` **Sebep:** ${data.penaltys[0].Reason}
`
})
        
    ]})

} else {return message.reply({content:"Bu komutu kullanmak için gerekli yetkilere veya rollere sahip değilsin."})}
}
}
module.exports = Cezabilgi;