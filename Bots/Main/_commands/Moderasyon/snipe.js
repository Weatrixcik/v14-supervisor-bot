const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,VoiceChannel,AttachmentBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")
class Snipe extends Command {
    constructor(client) {
        super(client, {
            name: "Snipe",
            description: "buraya yaz bişey lan",
            usage: ".snipe",
            category: "Moderasyon",
            aliases: ["snipe","snip","snp"],
            enabled: true,
        });
    }
    

async onLoad(client) {
    
    }

 async onRequest (client, message, args,) {
    let roles = await Roles.findOne({guildID: message.guild.id})
    let channels = await Channel.findOne({guildID: message.guild.id})
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [roles.botcommands].some(x=> message.member.roles.cache.has(x))){
        let mesaj = client.snipe.get(message.channel.id);
        if (!mesaj) return message.react("🚫")
        const embed = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({name: mesaj.member.displayName,iconURL:mesaj.author.avatarURL({dynamic: true})})
        .setDescription(`${client.emojis.cache.find(x => x.name === "appEmoji_unlem")} Mesaj içeriği: ${mesaj.content.slice(0, 1000).replace(new RegExp(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi), "\`Link\`").replace(new RegExp(/(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i, "g"), "\`Sunucu Linki\`")}${mesaj.content.length > 1000 ? "... (sığmadı)" : ""}\n${client.emojis.cache.find(x => x.name === "appEmoji_unlem")} Mesajın Silinme Tarih <t:${Math.floor(Math.floor(mesaj.createdTimestamp) / 1000)}:R>`)
        message.reply({embeds: [embed]}).then(msg => { setTimeout(() => { msg.delete(); }, 13000); })
        message.react("✅")
        client.snipe.delete(message.channel.id)
    } else return
}
}
module.exports = Snipe;
