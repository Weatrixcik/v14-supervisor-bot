
const { PermissionsBitField,Formatters } = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");

class Help extends Command {
    constructor(client) {
        super(client, {
            name: "yardım",
            description: "Bot'a eklenmiş olan komutları gösterir",
            usage: ".yardım",
            category: "Global",
            aliases: ["help","yardım"],
            enabled: true,

            cooldown: 3500,

        });
    }
    
   async onRequest (client, message, args,embed) {
    if(message)
    if(!args[0]) return message.reply({embeds:[embed.setDescription(`**${client.users.cache.get(client.owners[0]).tag}** tarafından \`${message.guild.name}\` sunucusuna yapılmış botun komutları aşağıda verilmiştir.\n ${client.commands.filter(x=> x.developer == false && x.guildOwner == false).map(x=>`\`${x.usage}\``).join("\n")}\n\n**Toplam ${client.commandLength} adet komut bulunuyor.**\n\`Not: Komut hakkında detaylı bilgi için ".yardım <Komut>" yazmanız yeterlidir.\``)]})
    if(args[0]){
        let _find = args[0].toLocaleLowerCase()
        let command = client.commands.get(_find) || client.aliases.get(_find);
        message.reply({embeds:[
            embed
            .setDescription(Formatters.codeBlock("md",
`# ${command.name} komutunun detayları;
> İsmi              : ${command.name}
> Kullanım          : ${command.usage}
> Diğer Anahtarları : ${command.aliases.filter(x=> x !== command.name).join(", ")}
> Beklem Süresi     : ${moment.duration(command.cooldown).format("s [Saniye]")}
< Açıklaması        : ${command.description}

`
            ))
        ]})
    }
    }
}

module.exports = Help
