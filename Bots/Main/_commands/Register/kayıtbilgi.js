const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const User = require("../../../../Global/Database/Profile")
class Kayıtbilgi extends Command {
    constructor(client) {
        super(client, {
            name: "kayıtbilgi",
            description: "Kişinin kayıt geçmişini gösterir.",
            usage: ".kayıtbilgi (@Clydev/ID)",
            category: "Register",
            aliases: ["reginfo","kayıtbilgi","kayıt-bilgi"],
            enabled: true,     
        });
    }
    

    onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [guildroleconf.kurucuPerms,guildroleconf.registerStaffRole].some(x=> message.member.roles.cache.has(x))){
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const data = await User.findOne({ userID: member.id }) || [];
    const Weatrix = new EmbedBuilder()
    .setDescription(`${member} toplam **${data.TeyitNo ? data.TeyitNo : 0}** kayıt yapmış!`)
    .addFields( 
        {name:"__Erkek__",value:`\`\`\`js\n${data.Teyitler ? data.Teyitler.filter(v => v.Gender === "Erkek").length : 0}\`\`\``,inline:true},
        {name:"__Kadın__",value:`\`\`\`js\n${data.Teyitler ? data.Teyitler.filter(v => v.Gender === "Kadın").length : 0}\`\`\``,inline:true},
        
        )
    return message.channel.send({ embeds: [Weatrix] })
} else return cevap(message,"komutKullanamazsın")
}
}
module.exports = Kayıtbilgi;