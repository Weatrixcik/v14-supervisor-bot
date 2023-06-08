const moment = global.moment = require('moment');
require("moment-duration-format");
require("moment-timezone");
const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder,PermissionsBitField,Intents } = require('discord.js');
const axios = require("axios");
const Guild = require('../Config/Guild');


let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık" };
global.aylar = aylartoplam;
const voice = global.voice = require("@discordjs/voice")


const sureCevir = global.sureCevir = function(veri){
  return moment.duration(veri).format("H [Saat], m [dakika]");
}
const tarihsel = global.tarihsel = function(tarih) {
    let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY")   
    return tarihci;
};

const createEnum = global.createEnum = function(keys) {
    const obj = {};
    for (const [index, key] of keys.entries()) {
      if (key === null) continue;
      obj[key] = index;
      obj[index] = key;
    }
    return obj;
}
const checkDays = global.checkDays = function(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " Gün" : " Gün") + " Önce";
}
const rakam = global.rakam = function(sayi,x) {
  var basamakbir = sayi.toString().replace(/ /g, "     ");
  var basamakiki = basamakbir.match(/([0-9])/g);
  basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (basamakiki) {
    basamakbir = basamakbir.replace(/([0-9])/g, d => {
      return {
        '0': x.emojis.cache.find(x=> x.name == "appEmoji_sifir") ? x.emojis.cache.find(x=> x.name == "appEmoji_sifir") : "0",
        '1': x.emojis.cache.find(x=> x.name == "appEmoji_bir") ? x.emojis.cache.find(x=> x.name == "appEmoji_bir") : "1",
        '2': x.emojis.cache.find(x=> x.name == "appEmoji_iki")? x.emojis.cache.find(x=> x.name == "appEmoji_iki") : "2",
        '3': x.emojis.cache.find(x=> x.name == "appEmoji_uc")? x.emojis.cache.find(x=> x.name == "appEmoji_uc") : "3",
        '4': x.emojis.cache.find(x=> x.name == "appEmoji_dort")? x.emojis.cache.find(x=> x.name == "appEmoji_dort") : "4",
        '5': x.emojis.cache.find(x=> x.name == "appEmoji_bes")? x.emojis.cache.find(x=> x.name == "appEmoji_bes") : "5",
        '6': x.emojis.cache.find(x=> x.name == "appEmoji_alti")? x.emojis.cache.find(x=> x.name == "appEmoji_alti") : "6",
        '7': x.emojis.cache.find(x=> x.name == "appEmoji_yedi")? x.emojis.cache.find(x=> x.name == "appEmoji_yedi") : "7",
        '8': x.emojis.cache.find(x=> x.name == "appEmoji_sekiz")? x.emojis.cache.find(x=> x.name == "appEmoji_sekiz") : "8",
        '9': x.emojis.cache.find(x=> x.name == "appEmoji_dokuz")? x.emojis.cache.find(x=> x.name == "appEmoji_dokuz") : "9",
      }
      [d];
    })
  }
  return basamakbir;
}
const sleep = global.sleep = function(ms) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + ms);
}

const emojiBul = global.emojiBul = async function(name,type){
  if(type == "id") return await client.guilds.cache.get(Guild.Guild.ID).emojis.cache.find(x=> x.name == name).id
  if(type == "name") return await client.guilds.cache.get(Guild.Guild.ID).emojis.cache.find(x=> x.name == name)
}
const chunkify = global.chunkify = function (array,chunkSize) {
  if (!array || !chunkSize) return array;

  let length = array.length;
  let slicePoint = 0;
  let result = [];

  while (slicePoint < length) {
    result.push(array.slice(slicePoint, slicePoint + chunkSize))
    slicePoint += chunkSize;
  }
  return result;
}

const cevap = global.cevap = async function(message,type){
const hataEmbed = global.hataEmbed =  new EmbedBuilder()
.setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
.setColor("Red")
.setFooter({text: "Developed By Weatrix | Hata olduğunu düşünüyorsan geliştirici ile iletişime geç!", iconURL: message.guild.members.cache.get(client.owners[0]).user.avatarURL({dynamic:true})});
const hata = message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") ? message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") : `**[ __Hata__ ]** \` | \``
if(type == "memberYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir kullanıcıyı etiketleyin **(\`@Weatrix\`)** veya **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "tagliYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Tag'a davet ettiğin kimseyi bulamadım!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "komutKullanamazsın") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Üzgünüm..., Bu komutu kullanamazsın!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "yetkilinYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Yetkili yaptığın kimseyi bulamadım!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kendisi") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kendi üstünde işlem yapamazsın!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "sureYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bi süre belirtilmeden işlem yapamam! **(\`Örn: 1s/1m/1h/1w\`)**`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "sebepYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bi sebep belirtilmeden işlem yapamam!*`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "rolYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir rol etiketleyin **(\`@Rol\`)** veya **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "rolIDYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir rol **\`ID\`**'si yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kanalYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir Kanal etiketleyin **(\`#Kanal\`)** veya **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "bannerYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcının Banner'i Bulunamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kategoriYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir Kategori **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "veriYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir Kategori **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kanalDYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir kanal **\`ID\`**'si yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "komutYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Komut sistemde bulunamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "sesteYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı herhangi bir ses kanalında değil!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "sesKanalıDolu") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Ses kanalı dolu olduğu için işlem yapılamaz!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "veriBulunamadı") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Veri bulunamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "yasYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Yaş girilmeden işlem yapamam.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "isimYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} İsim girilmeden işlem yapamam.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kendisiSesteYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} ${message.member} seste bulunmadığı(n) için işlem yapılamaz!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "rolverisiYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Rol bulunamadığı için işlem yapılamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "yetersizYetki") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Yetersiz yetki !`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "yetersizYetki") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Yetersiz yetki !`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "isimSınır") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı isim uzunluğu en fazla 32 karakter olabilir`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "cezali") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı cezalı olduğu için işlem yapılamaz.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "supheli") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı şüpheli olduğu için işlem yapılamaz.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "yasakliTag") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı "Yasaklı Tag" rolüne sahip olduğu için işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "bot") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Botlar üstünde işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "üstAynıYetki") return message.reply({embeds:[hataEmbed.setDescription(`${hata} kendinden Üst/Aynı yetkide ki kullanıcılar veya bot sahipleri üstünde işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kayitli") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı kayıtlı olduğundan işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kayitsiz") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı kayıtsız olduğundan işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
}

