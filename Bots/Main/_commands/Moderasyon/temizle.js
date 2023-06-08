const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,VoiceChannel,AttachmentBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")
class Sil extends Command {
    constructor(client) {
          super(client, {//naber 
            name: "temizle",
            description: "Bot ile mesaj göndermek için",
            usage: ".temizle",
            category: "Moderasyon",
            aliases: ["sil","temizle"],
            enabled: true,
        });
    }
    

async onLoad(client) {
    
    }

 async onRequest (client, message, args,) {
    let roles = await Roles.findOne({guildID: message.guild.id})
    let channels = await Channel.findOne({guildID: message.guild.id})
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))){
        if (!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_unlem")).catch(() => { })

        message.channel.bulkDelete(Number(args[0])).then(msg => message.channel.send(`${client.emojis.cache.find(x => x.name === "appEmoji_tik")} ${message.channel} Kanalından **${msg.size}** adet mesaj temizlendi!`)).catch(() => { }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    } else return
}
}
module.exports = Sil;
