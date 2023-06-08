const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const Users = require("../../../../Global/Database/Profile")
const Channel = require("../../../../Global/Database/Channel")

class Kayıtsız extends Command {
    constructor(client) {
        super(client, {
            name: "kayıtsız",
            description: "Kayıtlı üyeleri kayıtsıza atmak için kullanılır.",
            usage: ".kayıtsız @Clydev/ID",
            category: "Register",
            aliases: ["unreg","unregister","kayitsiz"],

            enabled: true, });
    }
    

    onLoad(client) {
    
    }

   async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers].some(x=> message.member.permissions.has(x))
    ||
    [guildroleconf.kurucuPerms,guildroleconf.registerStaffRole].some(x=> message.member.roles.cache.has(x))){
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return cevap(message,"memberYok");
    if (roles.unregisterRoles.some(x=> member.roles.cache.has(x))) return cevap(message,"kayitsiz")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return cevap(message,"yetersizYetki")
    if (member.roles.highest.position >= message.member.roles.highest.position && !ayarlar.Owners.includes(message.author.id)) return cevap(message,"üstAynıYetki")
    var setName = `• İsim | Yaş`;
    await member.setNickname(setName, `${message.member.user.tag} tarafından kayıtsıza atıldı.`);
    let roller = member.roles.cache.filter(x=> x.id != roles.boosterRole && x.id != message.guild.id).map(x=> x.id)
    await member.roles.remove(roller)
    setTimeout(async() => {
        await member.roles.add(roles.unregisterRoles)
    }, 1000);
    message.reply({embeds:[embed.setDescription(`${member} üzerinde bulunan roller başarıyla alınıp **Kayıtsız**'a atıldı!`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })
    let guildchannelconf = await Channel.findOne({guildID: message.guild.id})
    await Users.updateOne({ userID: member.id }, { $unset: { Teyitci: {} } });
    await Users.findOneAndUpDate({ userID: member.id }, { $push: { Names: { userID: message.author.id, Name: setName, islem: "Kayıtsıza Atma", rol: roles.unregisterRoles[0]} } }, { upsert: true });
    const log = member.guild.channels.cache.get(guildchannelconf.kayıtsızlog);
    if(log) await log.send({content:`**${member.user.tag}**, **${message.member.user.tag}** tarafından <t:${(Date.now()/1000).toFixed()}:> (<t:${(Date.now()/1000).toFixed()}:R>) Kayıtsıza atıldı!`})
} else return cevap(message,"komutKullanamazsın")

   }
}
module.exports = Kayıtsız;