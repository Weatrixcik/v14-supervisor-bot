const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");

class Emoji extends Command {
    constructor(client) {
        super(client, {
            name: "emoji",
            description: "manuel kod denemeleri için",
            usage: ".emojiekle",
            category: "weatrix",
            aliases: ["emekle","emoji","emojiekle"],

            enabled: true,

            developer:true
        });
    }
    

    onLoad(client) {
    
    }

   async onRequest (client, msg, args,embed) {
  if(args[0] == "kur"){
const emojiler = 
[
 {name:"appEmoji_bir",link:"https://cdn.discordapp.com/emojis/994628089592156220.webp?size=96&quality=lossless"},
 {name:"appEmoji_iki",link:"https://cdn.discordapp.com/emojis/994628094172332062.webp?size=96&quality=lossless"},
 {name:"appEmoji_uc",link:"https://cdn.discordapp.com/emojis/994628099738189894.webp?size=96&quality=lossless"},
 {name:"appEmoji_dort",link:"https://cdn.discordapp.com/emojis/994628103496286228.webp?size=96&quality=lossless"},
 {name:"appEmoji_bes",link:"https://cdn.discordapp.com/emojis/994628107443122246.webp?size=96&quality=lossless"},
 {name:"appEmoji_alti",link:"https://cdn.discordapp.com/emojis/994628111771652248.webp?size=96&quality=lossless"},
 {name:"appEmoji_yedi",link:"https://cdn.discordapp.com/emojis/994628116603469844.webp?size=96&quality=lossless"},
 {name:"appEmoji_sekiz",link:"https://cdn.discordapp.com/emojis/994628120789393458.webp?size=96&quality=lossless"},
 {name:"appEmoji_dokuz",link:"https://cdn.discordapp.com/emojis/994628124782379088.webp?size=96&quality=lossless"},
 {name:"appEmoji_sifir",link:"https://cdn.discordapp.com/emojis/994628084709994536.webp?size=96&quality=lossless"},
 {name:"appEmoji_cop",link:"https://cdn.discordapp.com/emojis/994706622536503367.webp?size=96&quality=lossless"},
 {name:"appEmoji_solOk",link:"https://cdn.discordapp.com/emojis/995056594805076029.webp?size=96&quality=lossless"},
 {name:"appEmoji_sagOk",link:"https://cdn.discordapp.com/emojis/995056603025916034.webp?size=96&quality=lossless"},
 {name:"appEmoji_tik",link:"https://cdn.discordapp.com/emojis/992914567334211655.webp?size=96&quality=lossless"},
 {name:"appEmoji_carpi",link:"https://cdn.discordapp.com/emojis/992914543724466268.webp?size=96&quality=lossless"},
 {name:"appEmoji_unlem",link:"https://cdn.discordapp.com/emojis/993229107968094298.webp?size=96&quality=lossless"},
 {name:"appEmoji_bos",link:"https://cdn.discordapp.com/emojis/1102623376083791882.webp?size=128&quality=lossless"},
 {name:"appEmoji_bosorta",link:"https://cdn.discordapp.com/emojis/1102623377421766687.webp?size=128&quality=lossless"},
 {name:"appEmoji_bosson",link:"https://cdn.discordapp.com/emojis/1102623378919149668.webp?size=128&quality=lossless"},
 {name:"appEmoji_dolu",link:"https://cdn.discordapp.com/emojis/1102623397550227577.webp?size=128&quality=lossless"},
 {name:"appEmoji_doluorta",link:"https://cdn.discordapp.com/emojis/1102623398913376347.webp?size=128&quality=lossless"},
 {name:"appEmoji_doluson",link:"https://cdn.discordapp.com/emojis/1102623401337696349.webp?size=128&quality=lossless"},

]
/* {name:"",link:""},
 */
for (let i = 0; i < emojiler.length; i++) {
  const emojix = emojiler[i];
  const e = msg.guild.emojis.cache.find(x=> x.name == emojix.name);
  if(e) { console.log(`${e.name} isimli emoji sunucuda bulunduğundan tekrar oluşturulmadı.`)}
  else {
    msg.guild.emojis.create({attachment:emojix.link,name: emojix.name})
    .then(emoji => msg.channel.send({embeds: [new EmbedBuilder().setDescription(`Başarıyla \`${emoji.name}\` adında emoji oluşturuldu. (${emoji})`)]}))
    }
}
}}
}
module.exports = Emoji;
