const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID:String,
  userID:String,
  cezaId:Number,
  penaltys:{type:Array,default:[]}
});

module.exports = model("weatrix_penaltys", schema);
