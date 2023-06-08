const { Client, EmbedBuilder,  ButtonBuilder, ButtonStyle, ActionRowBuilder, Discord } = require("discord.js");
const { DiscordBanners } = require('discord-banners');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const discordBanners = new DiscordBanners(client);
class Banner extends Command {
    constructor(client) {
        super(client, {
            name: "banner",
            description: "Aptal Banner Arayanlara banner istedigi kullanicinin bannerin verir :)",
            usage: ".banner",
            category: "Global",
            aliases: ["Banner","banner","afiş","afis"],
            enabled: true,
 
            });
    }
async onRequest (client, message, args) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
         const banner = await discordBanners.getBanner(member.id, { size: 2048, format: "png", dynamic: true })
         if(banner){   
        let link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda aç", style:ButtonStyle.Link, url: banner})]})
         await message.reply({
             content: `${banner}`
             , components:[link] })}
             if(message) await message.react(await emojiBul("appEmoji_tik"))

         else return cevap(message,"bannerYok")

};
}

module.exports = Banner;