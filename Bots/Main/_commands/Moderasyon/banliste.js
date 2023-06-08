const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const cezapuan = require("../../../../Global/Database/cezapuan")
const penalty =require("../../../../Global/Database/ceza")
const bans = require("../../../../Global/Database/ban")
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")
class Banliste extends Command {
    constructor(client) {
        super(client, {
            name: "Ban",
            description: "Sunucudaki yasaklı kişileri gösterir.",
            usage: ".ban @weatrix/ID",
            category: "Moderasyon",
            aliases: ["ban-list","banlist","yasaklılar"],
            enabled: true,
        });
    }
async onRequest (client, message, args, embed) {
    let roles = await Roles.findOne({guildID: message.guild.id})
    let channels = await Channel.findOne({guildID: message.guild.id})
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x)) || 
[roles.banhammer].some(x=> message.member.roles.cache.has(x))) {

    var bannedLength = 0;
await  message.guild.bans.fetch().then(async (banned)=> bannedLength = banned.size);
var bannedUsers = [];
await message.guild.bans.fetch().then(async (banned) => {
var i = 0;
    banned.forEach(async (user) => {
        i = i+1
       bannedUsers.push(`${i}. ${user.user.tag} (${user.user.id})`)
   })
})
let mesaj = await chunkify(bannedUsers,20)
message.channel.send({content:`Sunucuda Toplam ${bannedLength} Adet Yasaklama Bulunuyor.`}).then(a=>{
mesaj.forEach(x=>message.channel.send({content:` \`\`\`md
${x.join("\n")}
\`\`\``}))
})
} else {return message.reply({content:"Bu komutu kullanmak için gerekli yetkilere veya rollere sahip değilsin."})}
}
}
module.exports = Banliste;