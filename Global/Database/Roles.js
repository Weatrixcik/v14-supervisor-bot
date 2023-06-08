const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  kurucuPerms:{type:Array, default:[]},
  unregisterRoles:{type:Array, default:[]},
  manRoles:{type:Array, default:[]},
  womanRoles:{type:Array, default:[]},
  taglırolu:{type:String, default:undefined},
  boosterRole:{type:String, default:undefined},
  registerStaffRole:{type:String, default:undefined},
  suspectRole:{type:String, default:undefined},
  bannedTagRole:{type:String, default:undefined},
  jailedRole:{type:String, default:undefined},
  mutehammer:{type:String, default:undefined},
  banhammer:{type:String, default:undefined},
  jailhammer:{type:String, default:undefined},
  vmutehammer:{type:String, default:undefined},
  botcommands:{type:String, default:undefined},
  muterol:{type:String, default:undefined},
  vmuterol:{type:String, default:undefined},
  toplantırol:{type:String, default:undefined},

});

module.exports = model("weatrix-Roles", schema);
