const { Event } = require("../../../../Global/Structures/Default.Events");
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")
const guildTagSystem = require("../../../../Global/Database/tagsistem")
const {Guild} = require("../../../../Global/Config/Guild")
class userUpdate extends Event {
    constructor(client) {
        super(client, {
            name: "userUpdate",
            enabled: true,
        });    
    }    

 async   onLoad(oldUser,newUser) {
const guild = await client.guilds.cache.get(Guild.ID)
const tagsistem = await guildTagSystem.findOne({guildID:guild.id})
let guildroleconf = await Roles.findOne({guildID: guild.id})
let guildchannelconf = await Channel.findOne({guildID: guild.id})
const tagLog = await guild.channels.cache.get(guildchannelconf.taglog);
const embed = new EmbedBuilder().setAuthor({name:guild.name,iconURL:guild.iconURL({dynamic:true})})
    const eskiMember = guild.members.cache.get(oldUser.id);
    const yeniMember = guild.members.cache.get(newUser.id);   
    const isimtaglari = tagsistem.nameTags;
    const etikettaglari = tagsistem.NmberTag;
    const tag = tagsistem.Tag;
const unTag = tagsistem.unTag;
if(!yeniMember.roles.cache.has(guildroleconf.taglırolu) && (!isimtaglari.some(tag=> oldUser.username.includes(tag))  && isimtaglari.some(tag=> newUser.username.includes(tag))) || (oldUser.discriminator != etikettaglari && newUser.discriminator == etikettaglari) || (!oldUser.username.includes(tag) && newUser.username.includes(tag))) {
    if(tagLog) await tagLog.send({embeds:[embed.setDescription(`${yeniMember} <t:${(Date.now()/1000).toFixed()}:R> kullanıcı adına tagımızı aldı.
    \`•\` __Eski kullanıcı adı__: **${oldUser.tag}**
    \`•\` __Yeni kullanıcı adı__: **${newUser.tag}**`)]});
    await yeniMember.setNickname(yeniMember.displayName.replace(unTag,tag));
    await yeniMember.roles.add(guildroleconf.taglırolu)
}
if(eskiMember.roles.cache.has(guildroleconf.taglırolu) && (isimtaglari.some(tag=> oldUser.username.includes(tag))  && !isimtaglari.some(tag=> newUser.username.includes(tag))) || (oldUser.discriminator == etikettaglari && newUser.discriminator != etikettaglari) || (oldUser.username.includes(tag) && !newUser.username.includes(tag))) {
    if(tagLog) await tagLog.send({embeds:[embed.setDescription(`${yeniMember} <t:${(Date.now()/1000).toFixed()}:R> kullanıcı adına tagımızı bıraktı.
    \`•\` __Eski kullanıcı adı__: **${oldUser.tag}**
    \`•\` __Yeni kullanıcı adı__: **${newUser.tag}**`)]});
await yeniMember.setNickname(yeniMember.displayName.replace(tag,unTag));
{
    let roller = await yeniMember.roles.cache.filter(x=> x.id != guild.id && [guildroleconf.manRoles,guildroleconf.womanRoles,guildroleconf.boosterRole].some(y=> y == x.id)).map(x=> `${x.id}`);
    await yeniMember.roles.set(roller)
}
}
};
};


module.exports = userUpdate