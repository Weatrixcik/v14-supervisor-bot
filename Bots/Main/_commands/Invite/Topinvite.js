const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const inviter =  require("../../../../Global/Database/invite")

class topDavet extends Command {
    constructor(client) {
        super(client, {
            name: "topDavet",
            description: "Davet Bilgilerinizi Gösterir.",
            usage: ".topDavet",
            category: "Invite",
            aliases: ["topdavet","davettop"],

            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {
 
    let data = await inviter.find({ guildID: message.guild.id });
    let davetSıralama = await data.filter(data=>data.total > 0 && message.guild.members.cache.get(data.userID)).length > 0 ? data.filter(data=>data.total > 0 && message.guild.members.cache.get(data.userID)).sort((a,b)=>b.total - a.total).map((x,Index)=>`\`${Index+1}.\` <@${x.userID}>: __${x.total}__`).splice(0,10).join("\n"):`Veri Bulunamadı!`
message.channel.send({embeds:[embed.setDescription(`**${message.guild.name}**, aşağıda en çok davet yapan **10** kullanıcı verilmiştir.`).setFields(
    {name:"Top 10 Davet", value:`**${davetSıralama}**`}
)]})
}
}
module.exports = topDavet;