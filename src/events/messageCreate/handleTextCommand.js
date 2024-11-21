const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

/**
 * @param {Message} message 
 */
module.exports = async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === 'create embed') {
      if (!message.member.permissions.has('Administrator')) {
        return message.reply('You do not have permission to send the embed.');
      }

      const suggestChannel = message.guild.channels.cache.get(
        // change this with your suggest channel ID
        '1302887596497567805'
      );

      const suggestionEmbed = new EmbedBuilder()
        .setColor(0x0014FF)
        .setTitle('We Value Your Ideas!')
        .setDescription('Got an idea or feedback? Click the button below to share your thoughts with us. Your suggestions help us grow and improve!');

      const suggestionButton = new ButtonBuilder()
        .setCustomId('suggestionButton')
        .setLabel('Make a Suggestion')
        .setStyle(ButtonStyle.Success);

      const actionRow = new ActionRowBuilder().addComponents(suggestionButton);

      await suggestChannel.send({
        embeds: [suggestionEmbed],
        components: [actionRow]
      });
    }
}