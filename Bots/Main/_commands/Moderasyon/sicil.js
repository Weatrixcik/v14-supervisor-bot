const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const penalty =require("../../../../Global/Database/ceza")
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")
class sicil extends Command {
    constructor(client) {
        super(client, {
            name: "Sicil",
            description: "ID'si girilen ceza bilgilerini gösterir.",
            usage: ".sicil CezaID",
            category: "Moderasyon",
            aliases: ["sicil","cezagecmis"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
    let roles = await Roles.findOne({guildID: message.guild.id})
    let channels = await Channel.findOne({guildID: message.guild.id})
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [roles.botcommands].some(x=> message.member.roles.cache.has(x))){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return cevap(message,"memberYok")
        var currentPage = 1
        var sayi = 1
        var data = await penalty.find({guildID:message.guild.id,userID:member.id});
        if(!data)return message.reply({content:`**${member.user.tag}** adlı kullanıcıya ait veri bulunamadı`})
        var sicil = [];
        for (let index = 0; index < data.length; index++) {
            sayi++
            const cezalar = data[index];
            sicil.push({UserID: cezalar.userID, cezaID:cezalar.cezaId, Staff:cezalar.penaltys[0].Staff,cezaTarih:cezalar.penaltys[0].SentencingDate, type:cezalar.penaltys[0].type,sebep:cezalar.penaltys[0].Reason})
        }
        let pages = sicil.chunk(10)
        if (!pages.length || !pages[currentPage - 1].length) return message.reply({content:`**${member.user.tag}** adlı kullanıcıya ait veri bulunamadı`})
        let geri = new ButtonBuilder().setCustomId('geri').setLabel("◀").setStyle(ButtonStyle.Secondary);
        let ileri = new ButtonBuilder().setCustomId('ileri').setLabel("▶").setStyle(ButtonStyle.Secondary)
        if(sayi < 5){
    geri.setDisabled(true);
    ileri.setDisabled(true);
    }
    let msg = await  message.channel.send({ components: [new ActionRowBuilder()
        .addComponents(
            geri,
          new ButtonBuilder()
            .setCustomId('cancel')
            .setEmoji(`✖`)
            .setStyle(ButtonStyle.Secondary),
            ileri
    
        )], embeds: [embed.setDescription(`${member} adlı üyenin toplam **${sayi - 1}** adet ceza geçmişi bulundu!\n\n${pages[currentPage - 1].map(x => `**#${x.cezaID}** \`[${x.type}]\` <t:${(x.cezaTarih/1000).toFixed()}> <@${x.Staff}>: \`${x.sebep}\``).join("\n")}`)] })
        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
        collector.on('collect', async (button, user) => {
            await button.deferUpdate();
                if (button.customId === "ileri") {
                    if (currentPage == pages.length) return;
                    currentPage++;
                    if (msg) msg.edit({ embeds: [embed.setDescription(`${member} adlı üyenin toplam **${sayi - 1}** adet ceza geçmişi bulundu!\n\n${pages[currentPage - 1].map(x => `**#${x.cezaID}** \`[${x.type}]\` <t:${(x.cezaTarih/1000).toFixed()}> <@${x.Staff}>: \`${x.sebep}\``).join("\n")}`)] })
                    await button.editReply({ content: `**Sayfa: ${currentPage}**`})
                }
                 if (button.customId === "cancel") {
        
                    if (msg) msg.delete().catch(err => { });
                    if (message) return message.delete().catch(err => { });
                    await button.editReply({ content: `**Ceza Geçmişi Silindi!**`})

                }
                 if (button.customId === "geri") {
        
                    if (currentPage == 1) return;
                    currentPage--;
                    if (msg) msg.edit({ embeds: [embed.setDescription(`${member} adlı üyenin toplam **${sayi - 1}** adet ceza geçmişi bulundu!\n\n${pages[currentPage - 1].map(x => `**#${x.cezaID}** \`[${x.type}]\` <t:${(x.cezaTarih/1000).toFixed()}> <@${x.Staff}>: \`${x.sebep}\``).join("\n")}`)] })
                    await button.editReply({ content: `**Sayfa: ${currentPage}**`})

                }
            }
         );
         collector.on("end", async (collected, reason) => {
            if (reason === "time") {
              if (msg)  msg.delete()
            }
          });
} else {return message.reply({content:"Bu komutu kullanmak için gerekli yetkilere veya rollere sahip değilsin."})}
}
}
module.exports = sicil;