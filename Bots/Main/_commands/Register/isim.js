const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const User = require("../../../../Global/Database/Profile")
class İsim extends Command {
    constructor(client) {
        super(client, {
            name: "isim",
            description: "Kullanıcının ismini değiştirmek için kullanılır",
            usage: ".isim @Clydev/ID",
            category: "Register",
            aliases: ["i","name"],
            enabled: true,
});
    }
 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [guildroleconf.kurucuPerms,guildroleconf.registerStaffRole].some(x=> message.member.roles.cache.has(x))){
        
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yas = args.filter(arg => !isNaN(arg))[0] || undefined

    if (!member) return cevap(message,"memberYok")
    if (!member.manageable) return cevap(message,"yetersizYetki")
    if (!isim) return cevap(message,"isimYok")
    let setName = `• ${isim} ${yas == undefined ? "":`| ${yas}`}`;
    if (setName.length > 32) return cevap(message,"isimSınır")
    if (member.manageable) await member.setNickname(`${setName}`, {reason:`İsim Değiştirme, Yetkili: ${message.author.id}`})
    const log = message.guild.channels.cache.find(x=> x.name == "isim_log")
if(log) await log.send({embeds:[embed.setDescription(`${member} adı ${message.member} tarafından __${new Date(Date.now()).toTurkishFormatDate()}__ tarihinde \`${setName}\` olarak değiştirildi.`)]})
    await User.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.author.id, Name: `${setName}`, islem: "İsim Değiştirme" } } }, { upsert: true });
    await message.reply({ embeds: [embed.setDescription(`${member} Adlı kullanıcının ismi  \`${setName}\` olarak ayarlandı.`)] });
} else return cevap(message,"komutKullanamazsın")
}
}
module.exports = İsim;