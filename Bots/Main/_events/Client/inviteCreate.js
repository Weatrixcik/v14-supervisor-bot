const { Collection, EmbedBuilder, PermissionsBitField,Formatters,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const ms = require('ms');
class inviteCreate extends Event {
    constructor(client) {
        super(client, {
            name: "inviteCreate",
            enabled: true,
        });
    }
    
 async onLoad(invites) {

    const invite = await invites.guild.invites.fetch();

    const codeUses = new Map();
    invite.each(inv => codeUses.set(inv.code, inv.uses));
    guildInvites.set(invites.guild.id, codeUses);
}
 }

module.exports = inviteCreate