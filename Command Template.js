
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
class template extends Command {
    constructor(client) {
        super(client, {
            name: "",
            description: "",
            usage: "",
            category: "",
            aliases: [""],

            enabled: true,

            permissions: ["BOT_OWNER","GUILD_OWNER", PermissionsBitField.Flags.Administrator,"938836851307987048"],
        });
    }
    

    onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

}
}
module.exports = template;