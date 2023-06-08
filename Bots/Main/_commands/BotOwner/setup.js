const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,VoiceChannel,AttachmentBuilder,SelectMenuBuilder,ChannelType,PermissionFlagsBits } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const Roles = require("../../../../Global/Database/Roles")
const Channel = require("../../../../Global/Database/Channel")
const tagsistem = require("../../../../Global/Database/tagsistem")
class Setup extends Command {
    constructor(client) {
        super(client, {
            name: "setup",
            description: "Bot Kurulum",
            usage: ".setup",
            category: "luhux",
            aliases: ["setup","kur","Setup","Kur"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    

async onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
    let sec = args[0]
    if(args[0] == "durum"){
    const row = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
        .setPlaceholder("Bir işlem seçiniz!")
        .setCustomId("kurulum")
        .setOptions([
            {value:"bilgi",description:"Kurulum Bilgi", label:"Kurulum Bilgi",emoji:{name:"⚙"}},
            {value:"tag",description:"Tag ayarlarını buradan yapabilirsiniz.", label:"Tag Ayarları",emoji:{name:"⚙"}},
            {value:"rol",description:"Rol ayarlarını buradan yapabilirsin", label:"Rol Ayaları",emoji:{name:"⚙"}},
            {value:"kanal",description:"Kanal ayarlarını buradan yapabilirsiniz.", label:"Kanal Ayarları",emoji:{name:"⚙"}},
            {value:"emoji",description:"Emoji kurulumunu burdan yapabilirsiniz", label:"Emoji Ayarları",emoji:{name:"⚙"}},
        ])
    )

    let x = await message.reply({embeds:[embed.setDescription(`\`${message.guild.name}\` Sunucusunun Yönetim Paneline Hoş Geldiniz. \n Bu menüden botunuzun tüm ayarlarını gerçekleştirebilirsiniz.`)], components:[row]})
    const filter = i => i.user.id == message.member.id 
    const collector = x.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
    collector.on('collect', async (i) => {
        if(i.values[0] == "tag") {
            const data = await tagsistem.findOne({guildID:message.guild.id});
            i.reply({content:"Tag Ayarlarları Gösteriliyor.", ephemeral:true})
            await x.edit({embeds:[new EmbedBuilder().setDescription(`
            \`Tag:\` ${data.Tag !=undefined ? `**${data.Tag}**`:"**AYARLANMADI**"}
            \`İsimTagları:\` ${data.nameTags.join(", ") !=undefined ? `${data.nameTags.join(", ")}`:"**AYARLANMADI**"}
            \`Tagsız Simge:\` ${data.unTag !=undefined ? `**${data.unTag}**`:"**AYARLANMADI**"}
            \`Etiket Tagı:\` #${data.NumberTag !=undefined ? `**${data.NumberTag}**`:"**AYARLANMADI**"}
            `).setAuthor({name:message.guild.name, iconURL: message.guild.iconURL({dynamic:true})}).setFooter({text:`Sunucunuzun Tagları (Taglar arası , koyun) yoksa olmaz (.setup nametag tag,tag2,tag3)`})]})}
        if(i.values[0] == "rol") {
            let guildroleconf = await Roles.findOne({guildID: message.guild.id})
            i.reply({content:"Rol Ayarlarları Gösteriliyor.", ephemeral:true})
            await x.edit({embeds:[new EmbedBuilder().setAuthor({name:message.guild.name, iconURL: message.guild.iconURL({dynamic:true})}).setDescription(`
            \`Kurucu Rolleri:\` ${guildroleconf ? guildroleconf.kurucuPerms.map(x=> `<@&${x}>`).join(", ") : "**AYARLANMADI**"}
            \`Kayıtsız Rolleri:\` ${guildroleconf ? guildroleconf.unregisterRoles.map(x=> `<@&${x}>`).join(", ") : "**AYARLANMADI**"}
            \`Taglı Rolü:\` ${guildroleconf.taglırolu !=undefined ? `<@&${guildroleconf.taglırolu}>`:"**AYARLANMADI**"}
            \`Erkek Rolleri:\` ${guildroleconf ? guildroleconf.manRoles.map(x=> `<@&${x}>`).join(", ") : "**AYARLANMADI**"}
            \`Kadın Rolleri:\` ${guildroleconf ? guildroleconf.womanRoles.map(x=> `<@&${x}>`).join(", ") : "**AYARLANMADI**"}
            \`Booster Rolü:\` ${guildroleconf.boosterRole !=undefined ? `<@&${guildroleconf.boosterRole}>`:"**AYARLANMADI**"}
            \`Register Staff:\` ${guildroleconf.registerStaffRole !=undefined ? `<@&${guildroleconf.registerStaffRole}>`:"**AYARLANMADI**"}
            \`Şüpheli:\` ${guildroleconf.suspectRole !=undefined ? `<@&${guildroleconf.suspectRole}>`:"**AYARLANMADI**"}
            
            
            `)]})}
            if(i.values[0] == "kanal") {
                let guildchannelconf = await Channel.findOne({guildID: message.guild.id})
                i.reply({content:"Kanal Ayarlarları Gösteriliyor.", ephemeral:true})
                await x.edit({embeds:[new EmbedBuilder().setAuthor({name:message.guild.name, iconURL: message.guild.iconURL({dynamic:true})}).setDescription(`
                \`Hoşgeldin Kanalı:\`${guildchannelconf.welcomeChannel != undefined ? `<#${guildchannelconf.welcomeChannel}>` : "**AYARLANMADI**"}
                \`Şüpheli Hesap Log:\`${guildchannelconf.suspectLog != undefined ? `<#${guildchannelconf.suspectLog}>` : "**AYARLANMADI**"}
                \`Davet Log:\`${guildchannelconf.inviteLog != undefined ? `<#${guildchannelconf.inviteLog}>` : "**AYARLANMADI**"}
                \`Chat (Genel Sohbet):\`${guildchannelconf.chatChannel != undefined ? `<#${guildchannelconf.chatChannel}>` : "**AYARLANMADI**"}
                \`Tag Log:\`${guildchannelconf.taglog != undefined ? `<#${guildchannelconf.taglog}>` : "**AYARLANMADI**"}
                \`Rules Kanal:\`${guildchannelconf.rules != undefined ? `<#${guildchannelconf.rules}>` : "**AYARLANMADI**"}
                
                
                `)]})}

                if(i.values[0] == "bilgi") {
                 
                    i.reply({content:"Kurulum Bilgi Gösteriliyor", ephemeral:true})
                    await x.edit({embeds:[new EmbedBuilder().setAuthor({name:message.guild.name, iconURL: message.guild.iconURL({dynamic:true})})
                        .setDescription(`\`${message.guild.name}\` Sunucusunun Yönetim Paneline Hoş Geldiniz.`)
                        .addFields( 
                            {name:"__Tag Kurulum__",value:`\`.setup tag\` **(TAG)**\n\`.setup tag2\` **(TAG2)**\n\`.setup etikettag\` **(#1937)**\n\`.setup nametag\` **[TAG1,TAG2,TAG3]**`},
                            {name:"__Kanal Kurulum__",value:`\`.setup sohbetkanal\` **(#chat)**\n\`.setup hoşgeldinkanal\` **(#registerkanal)**\n\`.setup şüphelilog\` **(#şüphelilog)**\n\`.setup taglog\` **(#taglog)**\n\`.setup invitekanal\` **(#invitekanal)**\n\`.setup rules\` **(#invitekanal)**\n\`.setup kayıtlog\` **(#kayıtlog)**\n\`.setup kayıtsızlog\` **(#kayıtsızlog)**\n\`.setup şüphelilog\` **(#şüphelilog)**`},
                            {name:"__Rol Kurulum__",value:`\`.setup erkek\` **(@erkekrol)**\n\`.setup kadın\` **(@kadınrol)**\n\`.setup boost\` **(@boostrol)**\n\`.setup kayıtcı\` **(@kayıtcırolü)**\n\`.setup şüpheli\` **(@şüphelirol)**\n\`.setup tagrolü\` **(@taglırolü)**\n\`.setup kayıtsız\` **(@kayıtsızrolü)**\n\`.setup kurucurolleri\` **(@kurucurolleri)**`}
                            )
                    
                    
                    ]})}

                    if(i.values[0] == "emoji") {
                 
                        i.reply({content:"Emojiler Kuruluyo", ephemeral:true})
                        
                        const emojiler = 
[

 {name:"appEmoji_solOk",link: "https://cdn.discordapp.com/emojis/1051268013179015279.webp?size=96&quality=lossless"},
 {name:"appEmoji_sagOk",link:"https://cdn.discordapp.com/emojis/1051268028492415106.webp?size=96&quality=lossless"},
 {name:"appEmoji_tik",link:"https://cdn.discordapp.com/emojis/999096619649728552.webp?size=96&quality=lossless"},
 {name:"appEmoji_carpi",link:"https://cdn.discordapp.com/emojis/999096621298110615.webp?size=96&quality=lossless"},
]

for (let ii = 0; ii < emojiler.length; ii++) {
    const emojix = emojiler[ii];
        i.guild.emojis.create({attachment:emojix.link,name: emojix.name})
      .then(emoji => i.channel.send({embeds: [new EmbedBuilder().setDescription(`Başarıyla \`${emoji.name}\` adında emoji oluşturuldu. (${emoji})`)]}))
      
  }
                        }
             
                       
        })
    }
  
    await Roles.findOne({guildID: message.guild.id}, async (err, data) => {
        if (err) console.log(err)

        if (["erkek", "Erkek", "Erkekrolleri", "man", "Man"].some(y => y === sec)) {
            let select;
            if (message.mentions.roles.size >= 1) {
                select = message.mentions.roles.map(r => r.id);
            } else {
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
                select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{manRoles:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };

        if (["kadın", "Kadın", "Kadınrolleri", "woman", "Woman"].some(y => y === sec)) {
            let select;
            if (message.mentions.roles.size >= 1) {
                select = message.mentions.roles.map(r => r.id);
            } else {
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
                select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{womanRoles:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["boost", "booster", "boostrol", "boosterrol"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{boosterRole:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["register", "kayıtcı", "Register", "RegisterStaff"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{registerStaffRole:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["yenihesap", "şüpheli", "Şüpheli", "yeniaq"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{suspectRole:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["taglırolü", "Taglırolü", "tagrolü", "Tagrolü"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{taglırolu:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["kayıtsız", "unregister", "kayıtsızüye", "uregister", "kayitsiz"].some(y => y === sec)) {
            let select;
            if (message.mentions.roles.size >= 1) {
                select = message.mentions.roles.map(r => r.id);
            } else {
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
                select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{unregisterRoles:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["banhammer", "bancı", "banyetki", "Banhammer"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{banhammer:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["mutehammer", "muteci", "muteyetki", "mutehammer"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{mutehammer:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["vmutehammer", "vmuteci", "vmuteyetki", "vmutehammer"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{vmutehammer:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["muterolü", "Muterolü", "chatmuterolü", "muterol"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{muterol:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["vmuterolü", "VMuterolü", "sesmuterolü", "VMuterol"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{vmuterol:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["botcommands", "botcommand", "Botcommands", "botcommandss"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{botcommands:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["jailhammer", "jailci", "jailhammers", "jailyetki"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{jailhammer:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["jailrol", "jail", "karantina", "jailataq"].some(y => y === sec)) {
            let select = message.mentions.roles.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{jailedRole:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["Kurucuperm", "kurucuyetki", "kurucurolleri", "Kurucurolleri", "KurucuRolleri"].some(y => y === sec)) {
            let select;
            if (message.mentions.roles.size >= 1) {
                select = message.mentions.roles.map(r => r.id);
            } else {
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
                select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
            }
            await Roles.findOneAndUpdate({guildID: message.guild.id}, {$set:{kurucuPerms:select}},{upsert:true})
            ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };

        if (["sohbet-kanal", "chat", "sohbetkanal", "genelchat"].some(y => y === sec)) {
            let select = message.mentions.channels.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{chatChannel:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };

        if (["Hoşgeldinkanalı", "registerkanalı", "hoşgeldinkanal"].some(y => y === sec)) {
            let select = message.mentions.channels.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{welcomeChannel:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };

        if (["Şüphelilog", "şüphelilog", "şüphelikanalı"].some(y => y === sec)) {
            let select = message.mentions.channels.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{suspectLog:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["mutelog", "mutecilog", "muteelogaq"].some(y => y === sec)) {
            let select = message.mentions.channels.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{mutelog:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["jaillog", "Jaillog", "jailkanal"].some(y => y === sec)) {
            let select = message.mentions.channels.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{jaillog:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["banlog", "Banlog", "banlognere"].some(y => y === sec)) {
            let select = message.mentions.channels.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{banlog:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };

        if (["taglog", "Taglog", "tagkanal"].some(y => y === sec)) {
            let select = message.mentions.channels.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{taglog:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["Cezapuan", "cezapuan", "cezapuankanal"].some(y => y === sec)) {
            let select = message.mentions.channels.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{penaltyPointsLog:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["kayıtsızlog", "Kayıtsızlog", "KAyıtsızlog"].some(y => y === sec)) {
            let select = message.mentions.channels.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{kayıtsızlog:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };

        if (["kayıtlog", "Kayıtlog", "kayıtlogu"].some(y => y === sec)) {
            let select = message.mentions.channels.first();
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{kayıtlog:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };

        if (["invitekanal", "İnvitekanal", "davetkanalı"].some(y => y === sec)) {
            let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!kanal) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{inviteLog:kanal}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };

        if (["rules", "ruleskanal", "kurallar"].some(y => y === sec)) {
            let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!kanal) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await Channel.findOneAndUpdate({guildID: message.guild.id}, {$set:{rules:kanal}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };

        if (["TAG", "tag", "Tag"].some(y => y === sec)) {
            let select = args[1];
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await tagsistem.findOneAndUpdate({guildID: message.guild.id}, {$set:{Tag:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["TAG2", "tag2", "Tag2"].some(y => y === sec)) {
            let select = args[1];
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await tagsistem.findOneAndUpdate({guildID: message.guild.id}, {$set:{unTag:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["Etikettag", "etiket", "etikettag"].some(y => y === sec)) {
            let select = args[1];
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            await tagsistem.findOneAndUpdate({guildID: message.guild.id}, {$set:{NumberTag:select}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
        if (["Nametag", "isimtag", "nametag"].some(y => y === sec)) {
            args = args.filter(a => a !== "" && a !== " ").splice(1);
            let select = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0) + arg.slice(2)).join(" ");
            if (!select) return message.react(client.emojis.cache.find(res => res.name === "appEmoji_carpi"));
            let tags = select.split(",")
            await tagsistem.findOneAndUpdate({guildID: message.guild.id}, {$set:{nameTags:tags}},{upsert:true})
          ,message.react(client.emojis.cache.find(res => res.name === "appEmoji_tik"));
        };
    })

 }
}
module.exports = Setup;