
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
class Text extends Command {
    constructor(client) {
        super(client, {
            name: "text",
            description: "Bot ile mesaj göndermek için",
            usage: ".text (metin/embed)",
            category: "Weatrix",
            aliases: ["yaz"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    

    onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
    if(args[0] != "metin" && args[0] != "embed") return message.reply({content:"göndermek istediğiniz mesajın türünü seçiniz (metin/embed)"})
   if(args[0]== "metin"){
    message.channel.send({content:`${args.splice(1).join(" ")}`})
   }
   if(args[0]== "embed"){
    message.channel.send({embeds:[embed.setDescription(`${args.splice(1).join(" ")}`)]})
   }
}
}
module.exports = Text;