const { GuildMember } = require('discord.js');

/**
 * @param {GuildMember} oldMember 
 * @param {GuildMember} newMember 
 */
module.exports = async (oldMember, newMember) => {
    if (oldMember.roles.cache.size === newMember.roles.cache.size) return;

    const verifiedRole = '1301819666427285506'; // change this with the ID of the verified role
    const unverifiedRole = '1301073378563723332'; // change this with the ID of the unverified role

    if (
        (!oldMember.roles.cache.has(verifiedRole) && newMember.roles.cache.has(verifiedRole)) ||
        (newMember.roles.cache.has(verifiedRole) && newMember.roles.cache.has(unverifiedRole))
    ) {
        try {
            await newMember.roles.remove(unverifiedRole);
        } catch (error) {
            console.log(
                `Cannot remove role from ${newMember.user.tag}: ${error}`
            );
        }
    }
}