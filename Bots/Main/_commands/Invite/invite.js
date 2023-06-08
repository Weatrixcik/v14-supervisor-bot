const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const inviter =  require("../../../../Global/Database/invite")
class Davetim extends Command {
    constructor(client) {
        super(client, {
            name: "Davetim",
            description: "Davet Bilgilerinizi Gösterir.",
            usage: ".davetim (@Clydev/ID)",
            category: "Invite",
            aliases: ["davetim","invite"],

            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {

    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let data = await inviter.findOne({ guildID: message.guild.id, userID: member.id });
if(member.id == message.member.id) {
return await message.reply({embeds:[embed.setDescription(`Toplam **${data.total+data.bonus}** ${member.id === message.author.id ? "davetin" : "daveti"} var. (Gerçek: \`${data.regular || "0"}\`, Bonus: \`${data.bonus || "0"}\`, Sahte: \`${data.fake || "0"}\`, Çıkış: \`${data.leave || "0"}\`)`) .setFooter({text:"Clydev was here !"})]})
}
    message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcının genel davet bilgileri;
    
    Toplam **${data.total+data.bonus}** ${member.id === message.author.id ? "davetin" : "daveti"} var. (Gerçek: \`${data.regular || "0"}\`, Bonus: \`${data.bonus || "0"}\`, Sahte: \`${data.fake || "0"}\`, Çıkış: \`${data.leave || "0"}\`)`)] });
 } 
}

module.exports = Davetim;