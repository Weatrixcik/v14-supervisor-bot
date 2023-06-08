const mongoose = require('mongoose');
module.exports =  mongoose.model("perms", mongoose.Schema({
    guildID: { type: String, default: "" },
    perms:{type:Array,default:[]}
}));