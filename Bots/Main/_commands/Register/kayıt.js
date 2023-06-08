const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActionRow ,StringSelectMenuBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const tagsistem = require("../../../../Global/Database/tagsistem")
const Users = require("../../../../Global/Database/Profile")
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")

class Kayıt extends Command {
    constructor(client) {
        super(client, {
            name: "kayıt",
            description: "Sunucuya üyeleri kayıt etmek için kullanılır.",
            usage: ".kayıt @Clydev/ID (isim) (yaş)",
            category: "Register",
            aliases: ["e","k","erkek","kız","kayıt","kayit"],

            enabled: true,
        });
    }
   async onRequest (client, message, args,embed) {
    let guildroleconf = await Roles.findOne({guildID: message.guild.id})
    let guildchannelconf = await Channel.findOne({guildID: message.guild.id})
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    
    [guildroleconf.kurucuPerms,guildroleconf.registerStaffRole].some(x=> message.member.roles.cache.has(x))){
      const data = await tagsistem.findOne({guildID:message.guild.id});      
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined
    let kayıtRolleri = [...guildroleconf.womanRoles,...guildroleconf.manRoles]
    if (!member) return cevap(message,"memberYok")
    if (member.roles.cache.has(guildroleconf.suspectRole)) return  cevap(message,"supheli")
    if (kayıtRolleri.some(role => member.roles.cache.has(role))) return  cevap(message,"kayitli")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return  cevap(message,"yetersizYetki")
    if (!isim) return  cevap(message,"isimYok")    
    if(message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !yaş) return  cevap(message,"yasYok")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return  cevap(message,"üstaynıYetki")
    var setName = `• ${isim} ${yaş == undefined ? "":`| ${yaş}`}`;
    if (setName.length > 32) return  message.reply({content:cevaplar.isimApiSınır})
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('Erkek')
        .setLabel("Erkek")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('Kadın')
        .setLabel("Kadın")
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('CANCEL')
        .setLabel("İptal")
        .setStyle(ButtonStyle.Secondary),
    );
    const log = member.guild.channels.cache.get(guildchannelconf.kayıtlog);
    const chat = message.guild.channels.cache.get(guildchannelconf.chatChannel);
const msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`${member}, Üyesinin ismi **${isim} | ${yaş}** olarak değiştirilicek.\n`)], components: [row]});
var filter =async (button) =>{
  await button.deferUpdate()
  return button.user.id === message.author.id};
const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
collector.on('collect', async (button, user) => {
let tamamlandi = await new ButtonBuilder().setCustomId("tamamlandı.").setDisabled(true).setLabel("Kayıt Tamamlandı").setStyle(ButtonStyle.Secondary)
if(member.user.username.includes(data.Tag) || data.nameTags.some(x=> member.user.username.includes(x)) || member.user.discriminator.includes(data.NumberTag)) await member.roles.add(guildroleconf.taglırolu)
      if (button.customId == "CANCEL") {
            if (msg) msg.delete().catch(err => { });
            if(message) await message.delete();
          }
      if(button.customId == "Erkek"){

           await msg.edit({ embeds:[embed.setDescription(`${member}, Üyesinin ismi **${isim} | ${yaş}** olarak değiştirildi.\n\n**ERKEK** olarak kayıt edildi.`)], components: [new ActionRowBuilder({components:[tamamlandi]})] })
            if(log) await log.send({content:`**${member.user.tag}**, **${message.member.user.tag}** tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) \`Erkek\` olarak kayıt edildi.`})
            await member.setNickname(setName)
            await member.roles.remove(guildroleconf.unregisterRoles)
            await Users.findOneAndUpdate({ userID: message.member.id }, { $inc: { TeyitNo: 1 } }, { upsert: true }).exec();
            await Users.findOneAndUpdate({ userID: message.member.id }, { $push: { Teyitler: { userID: member.id, rol: guildroleconf.manRoles[0], date: Date.now(), Gender: "Erkek" } } }, { upsert: true });
            await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.member.id, Name: `${isim} | ${yaş}`, rol: guildroleconf.manRoles[0], islem: "Kayıt" } } }, { upsert: true });
            await Users.findOneAndUpdate({ userID: member.id }, { $set: { Teyitci: { userID: message.member.id, Cinsiyet: guildroleconf.manRoles[0], date: Date.now() } } }, { upsert: true });
            setTimeout(async() => {await member.roles.add(guildroleconf.manRoles);}, 1000);
            if(chat) await chat.send({content:`${member}, sunucumuza **Erkek** olarak katıldı! onu sevgiyle kucaklıyalım!`}).then(x=>setTimeout(() => {if(x) x.delete()},10000 ))
            }
      if(button.customId == "Kadın"){

        await msg.edit({ embeds:[embed.setDescription(`${member}, Üyesinin ismi **${isim} | ${yaş}** olarak değiştirildi.\n\n**KADIN** olarak kayıt edildi.`)], components: [new ActionRowBuilder({components:[tamamlandi]})] })
            if(log) await log.send({content:`**${member.user.tag}**, **${message.member.user.tag}** tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) \`Kadın\` olarak kayıt edildi.`})
            await member.setNickname(setName)
            await member.roles.remove(guildroleconf.unregisterRoles)
            await Users.findOneAndUpdate({ userID: message.member.id }, { $inc: { TeyitNo: 1 } }, { upsert: true }).exec();
            await Users.findOneAndUpdate({ userID: message.member.id }, { $push: { Teyitler: { userID: member.id, rol:guildroleconf.womanRoles[0], date: Date.now(), Gender: "Kadın" } } }, { upsert: true });
            await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.member.id, Name: `${isim} | ${yaş}`, rol: guildroleconf.womanRoles[0], islem: "Kayıt" } } }, { upsert: true });
            await Users.findOneAndUpdate({ userID: member.id }, { $set: { Teyitci: { userID: message.member.id, Cinsiyet: guildroleconf.womanRoles[0], date: Date.now() } } }, { upsert: true });
            setTimeout(async() => {await member.roles.add(guildroleconf.womanRoles);}, 1000);
            if(chat) await chat.send({content:`${member}, sunucumuza **Kız** olarak katıldı! onu sevgiyle kucaklıyalım!`}).then(x=>setTimeout(() => {if(x) x.delete()},10000 ))
          }

})

} else return cevap(message,"komutKullanamazsın") 
}
}

module.exports = Kayıt
