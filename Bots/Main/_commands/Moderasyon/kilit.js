const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,VoiceChannel,AttachmentBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
class Kilit extends Command {
    constructor(client) {
        super(client, {
            name: "kilit",
            description: "buraya yaz bişey lan",
            usage: ".kilit",
            category: "Moderasyon",
            aliases: ["kilit","lock"],
            enabled: true,
        });
    }
    

async onLoad(client) {
    
    }

    async onRequest (client, message, args,embed) {
        if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,]){
        if (args[0] == "aç") {
            message.channel.permissionOverwrites.edit(message.guild.id, {
                SendMessages: null
            }).then(async() => {
                message.react("🔓")
                await message.reply("🔓 Kanal Kilidi Açıldı.")
            })
        }

        if (args[0] == "kapat") {
            message.channel.permissionOverwrites.edit(message.guild.id, {
                SendMessages: false
            }).then(async() => {
                message.react("🔒")
                await message.reply("🔓 Kanal Kilitlendi.")
            })
        }

    } else {
        return 
      }
}
      }


module.exports = Kilit;