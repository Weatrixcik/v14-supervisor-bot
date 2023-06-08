
const { EmbedBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const children = require("child_process");

class Reboot extends Command {
    constructor(client) {
        super(client, {
            name: "reboot",
            description: "Bot/kod yenileme işlemini yapar.",
            usage: ".reboot",
            category: "Weatrix",
            aliases: ["yenile","reload","r"],
            enabled: true,
            developer: true
        });
    }
   async onRequest (client, message, args) {
    if (!args[0]) {
        await message.react("🔃")
        await message.react("✅")
        console.log("[BOT] Bot yeniden başlatıldı.");
        process.exit(0);
    }
    if(args[0] == "all") {
        const ls = children.exec(`pm2 restart all`);
     return ls.stdout.on('data', function (data) {message.reply("Tüm botlar yeniden başlatılıyor")});
    }
    let _find = args[0].toLocaleLowerCase()
    let command = client.commands.get(_find) || client.aliases.get(_find);
    if(!command) return message.reply({content:`**${args[0]}** adında bir komut bulunamadı.`}).then((x) => setTimeout(() => { x.delete() }, 5000))
   const msg = await message.channel.send(`\`${command.name}\` adlı komut yeniden başlatılıyor!`);
   let a = command.location
   delete require.cache[require.resolve(`../${command.location}/${command.name}.js`)];
   const cmd = new (require(`../${command.location}/${command.name}.js`))(client);
   cmd.location = a;
   if(cmd) cmd.on()
   await message.react("🔃")
   await message.react("✅")
    console.log(`[COMMAND] ${command.name} adlı komut yeniden başlatıldı`);
   msg.edit(`\`${command.name}\` adlı komut yeniden başlatıldı!`).then((x) => setTimeout(() => { x.delete() }, 5000))
    }
}
module.exports = Reboot
