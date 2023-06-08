 const mongoose = require('mongoose');

const schema = mongoose.model("TagMode", mongoose.Schema({
    guildID: { type: String },
    Public: {type: Array, default: []},
    Ekip: {type: Array, default: []}
}));

  module.exports = schema;