const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const User = require("../../../../Global/Database/Profile")
class İsimler extends Command {
    constructor(client) {
        super(client, {
            name: "isimler",
            description: "Kişinin geçmiş isimlerini gösterir.",
            usage: ".isimler @Clydev/ID",
            category: "Register",
            aliases: ["İsimler","names"],
            enabled: true,
});
    }
 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
  [guildroleconf.kurucuPerms,guildroleconf.registerStaffRole].some(x=> message.member.roles.cache.has(x))){

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const data = await  User.findOne({ userID: member.id }) || []
    if (!data) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait herhangi bir isim verisi bulunamadı!`)] });
    if (!data.Names) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait herhangi bir isim verisi bulunamadı!`)] });
    let isimler = data.Names
     const History = isimler.map((e, i) => ` \`${i + 1}.\` \`${e.Name}\` ${e.rol ? `(<@&${e.rol}>)` : ""} (${e.islem}) (<@!${e.userID}>)`).slice(0, 30)
     message.reply({ embeds: [embed.setDescription(`${member} adlı üyenin geçmiş isimleri sırasıyla aşağıda listelenmiştir.

    ${History.join("\n")}
        
    ${client.emojis.cache.find(x => x.name === "appEmoji_tik") || "Emoji Bulunamadı"} üyenin \`${History.length}\` adet geçmiş ismi görüntülendi.`)]}), message.react(`${client.emojis.cache.find(x => x.name === "appEmoji_tik")}`) 
        
} else return cevap(message,"komutKullanamazsın")
}
}
module.exports = İsimler;