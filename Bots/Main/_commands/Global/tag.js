const tagsistem = require("../../../../Global/Database/tagsistem")
const { Command } = require("../../../../Global/Structures/Default.Commands");
class Tag extends Command {
    constructor(client) {
        super(client, {
            name: "Tag",
            description: "Sunucu Tagı",
            usage: ".tag",
            category: "Global",
            aliases: ["tag","tag","tagh"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args) {
 
    let data = await tagsistem.findOne({guildID: message.guild.id})
    message.reply(`**${data.Tag}  ${data.nameTags.join(", ")} ${data.NumberTag}**`);

            
        }
    }

    module.exports = Tag;