const { Weatrix } = require('../../Global/Structures/Default.Clients.js');
const {Bots} = require("../../Global/Config/Guild").Guild
let client = global.client = new Weatrix({
    token: Bots.mainToken,
    prefix: Bots.prefixs,
    owners: Bots.devs,
    MongoURI: Bots.MongoDb,
    _dirname: "Main"
});

const invites = client.invites = {};
const guildInvites = global.guildInvites = new Map()
client.fetchCommands(true, true);
client.fetchEvents(true)
client.connect()
