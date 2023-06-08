const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: {type:String, default:undefined},
  Tag:{type:String,default:undefined},
  welcomeChannel: {type:String, default:undefined},
  suspectLog: {type:String, default:undefined},
  chatChannel: {type:String, default:undefined},
  taglog: {type:String, default:undefined},
  rules: {type:String, default:undefined},
  inviteLog: {type:String, default:undefined},
  kayıtsızlog: {type:String, default:undefined},
  kayıtlog: {type:String, default:undefined},
  penaltyPointsLog: {type:String, default:undefined},
  mutelog: {type:String, default:undefined},
  vmutelog: {type:String, default:undefined},
  jaillog: {type:String, default:undefined},
  banlog: {type:String, default:undefined},
  toplantı: {type:String, default:undefined},
});

module.exports = model("weatrix-Channel", schema);
