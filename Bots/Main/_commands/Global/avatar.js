const { Client, EmbedBuilder,  ButtonBuilder, ButtonStyle, ActionRowBuilder, Discord } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
class Avatar extends Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            description: "Aptal Avatar Arayanlara avatar istediği kullanıcının avatarını verir :)",
            usage: ".avatar",
            category: "Global",
            aliases: ["avatar","av","lulux"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args) {
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  let link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda aç", style:ButtonStyle.Link, url: member.user.displayAvatarURL({dynamic:true})})]})
  await message.reply({
    content: `${member.user.displayAvatarURL({dynamic:true, format:"png"})}`,
    components:[link]
  })
  if(message) await message.react(await emojiBul("appEmoji_tik"))

            
        }
    }

    module.exports = Avatar;