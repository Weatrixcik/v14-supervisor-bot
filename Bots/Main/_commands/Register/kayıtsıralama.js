const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Profile")
class kayıtSıralama extends Command {
    constructor(client) {
        super(client, {
            name: "kayıtsıralama",
            description: "Kayıt sıralamasını gösterir",
            usage: ".kayıtsıralama",
            category: "Register",
            aliases: ["regleaderboard","topteyit","kayıtsıralama"],

            enabled: true,
      });
    }
    

    onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [guildroleconf.kurucuPerms,guildroleconf.registerStaffRole].some(x=> message.member.roles.cache.has(x))){

    const data = await User.find() || [];
    let teyitList = data.filter((x) => message.guild.members.cache.has(x.userID) && x.TeyitNo > 0).map((value, index) => `\`${index+1}.\` ${message.guild.members.cache.get(value.userID)} \`${value.Teyitler.filter(v => v.Gender === "Erkek").length + value.Teyitler.filter(v => v.Gender === "Kadın").length} Kayıt\``).slice(0, 20)
    await message.channel.send({ embeds: [embed.addFields({name:"**Kayıtlar Sıralama**", value:`${teyitList.join("\n") || "Kayıt verisi bulunamadı!"}`,inline: true})] });
} else return cevap(message,"komutKullanamazsın")

}
}
module.exports = kayıtSıralama;

