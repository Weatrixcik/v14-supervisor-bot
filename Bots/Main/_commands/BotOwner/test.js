
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,VoiceChannel,AttachmentBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
class test extends Command {
    constructor(client) {
        super(client, {
            name: "test",
            description: "Bot ile mesaj göndermek için",
            usage: ".test (metin/embed)",
            category: "Weatrix",
            aliases: ["test"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    

async onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
   console.log("sikimiyeeeeee")
 }
}
module.exports = test;
