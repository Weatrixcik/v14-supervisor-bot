const { Collection, EmbedBuilder, PermissionsBitField,Formatters,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const inviteSchema = require("../../../../Global/Database/invite")
const Channel = require("../../../../Global/Database/Channel")
const Roles = require("../../../../Global/Database/Roles")
class MemberAdd extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberAdd",
            enabled: true,
        });
    }
    
 async onLoad(member) {
    let guildchannelconf = await Channel.findOne({guildID: member.guild.id})
    let guildroleconf = await Roles.findOne({guildID: member.guild.id})
    const invChannel = member.guild.channels.cache.get(guildchannelconf.inviteLog);
    if(!invChannel) return console.log("İnv Log kanalı Bulunamadı!")
    let fakeControl = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7
    const cachedInvites = await guildInvites.get(member.guild.id) || await new Collection().clone();
    const invites = await member.guild.invites.fetch();
    const invite = invites.find(inv => cachedInvites.get(inv.code) < inv.uses) || member.guild.vanityURLCode;
    const codeUses = new Map();
    invites.forEach(inv => codeUses.set(inv.code, inv.uses));
    guildInvites.set(member.guild.id, codeUses);
    const sagOk = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_sagOk")
    const carpi = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_carpi")
    const tik = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_tik")


        const welcomeChannel = member.guild.channels.cache.get(guildchannelconf.welcomeChannel);
        const suspectChannel = member.guild.channels.cache.get(guildchannelconf.suspectLog);
        const rules = member.guild.channels.cache.get(guildchannelconf.rules);
        const embed = new EmbedBuilder()
        .setAuthor({name:member.guild.name, iconURL:member.guild.iconURL()})
        .setFooter({text:"Developed By Clydev"})
        const kontrol = new Date().getTime() - member.user.createdAt.getTime() < 604800000 ? false : true
        if(welcomeChannel && kontrol == true){
            await member.roles.add(guildroleconf.unregisterRoles)
          
             member.setNickname(`• İsim | Yaş`)
             welcomeChannel.send({
                content: `
Sunucumuza Hoş geldin ${member.toString()}! Hesabın **<t:${Math.floor(Math.floor(member.user.createdTimestamp) / 1000)}:f>** tarihinde (<t:${Math.floor(Math.floor(member.user.createdTimestamp) / 1000)}:R>) oluşturulmuş.     
         
Sunucuya erişebilmek için "Sesli Kayıt" odalarında yetkililerimize isim yaş belirtmelisin   
${rules} kanalına göz atmayı unutmayınız.
                            
Tagımıza ulaşmak için herhangi bir kanala '!tag' yazabilirsiniz.
Seninle beraber **${member.guild.memberCount}** kişiyiz!:tada:`})

        } else if (suspectChannel && kontrol == false){
             member.roles.add(guildroleconf.suspectRole)
            return suspectChannel.send({embeds:[embed.setDescription(`${member} isimli üye sunucuya katıldı fakat hesabı bir hafta içinde açılığından dolayı \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **şüpheli hesap** olarak işaretlendi.`)]});
        }
        else{
            console.log("guildMemberAdd Eventinde sorun var!")
        }

    

    if(invite === member.guild.vanityURLCode) {
        

        await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.id }, { $set: { inviter: member.guild.id } }, { upsert: true });
        if(invChannel) invChannel.send({ content: `${sagOk} **${member.user.tag}** <t:${Math.floor(Math.floor(Date.now() / 1000))}:R> sunucuya **ÖZEL URL** ile katıldı! ${fakeControl === true ? `${carpi}`: `${tik}`}`});
        

    } else if(invite) {
    
        const inviter = client.users.cache.get(invite?.inviter.id)

        if(!invite?.inviter) {
        
            if(fakeControl) {

            if(invChannel) invChannel.send({ content: `${member} <t:${Math.floor(Date.now() / 1000)}:R> sunucuya katıldı, davet eden kişi bulunamadı! ${carpi}`})
            return;
            
        }

            if(invChannel) invChannel.send({ content: `${member} <t:${Math.floor(Date.now() / 1000)}:R> sunucuya katıldı, davet eden kişi bulunamadı!`})

        }

    if(fakeControl) {

        await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { total: 1, fake: 1, dailyInvites: 1, weeklyInvites: 1 } }, { upsert: true });
        await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.id }, { $set: { inviter: inviter.id } }, { upsert: true });

        const data = await inviteSchema.findOne({ guildID: member.guild.id, userID: inviter.id });

        invChannel.send({ content: `${sagOk}  **${member.user.tag}** <t:${Math.floor(Date.now() / 1000)}:R> **${inviter.tag}** (**${data.total+data.bonus}**) daveti ile sunucuya katıldı! ${fakeControl === true ? `${carpi}`: `${tik}`}`});    
        return;
    }

    if(invChannel) {
        const data = await inviteSchema.findOne({ guildID: member.guild.id, userID: inviter.id });
    await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.id }, { $set: { inviter: inviter.id } }, { upsert: true });
    await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { total: 1, regular: 1, dailyInvites: 1, weeklyInvites: 1 } }, { upsert: true });


    invChannel.send({ content: `${sagOk}  **${member.user.tag}** <t:${Math.floor(Date.now() / 1000)}:R> **${inviter.tag}** (**${data.total+data.bonus}**) daveti ile sunucuya katıldı! ${fakeControl === true ? `${carpi}`: `${tik}`}`});

    }

    }
 }
}
module.exports = MemberAdd;