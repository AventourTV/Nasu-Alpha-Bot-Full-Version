const {
    ChatInputCommandInteraction
  } = require('discord.js');
  const GuildConfiguration = require('../models/GuildConfiguration');
  const sendSuggestion = require('../utils/sendSuggestion');
  
  module.exports = {
    data: {
      name: 'suggest',
      description: 'Create a suggestion.',
      dm_permission: false,
    },
  
    /**
     *
     * @param {Object} param0
     * @param {ChatInputCommandInteraction} param0.interaction
     */
    run: async ({ interaction }) => {
      try {
        const guildConfiguration = await GuildConfiguration.findOne({ guildId: interaction.guildId });
  
        if (!guildConfiguration?.suggestionChannelIds.length) {
          await interaction.reply(
            'This server has not been configured to use suggestions yet.\nAsk an admin to run `/config-suggestions add` to set this up.'
          );
          return;
        }
  
        if (!guildConfiguration.suggestionChannelIds.includes(interaction.channelId)) {
          await interaction.reply(
            `This channel is not configured to use suggestions. Try one of these channels instead: ${guildConfiguration.suggestionChannelIds
              .map((id) => `<#${id}>`)
              .join(', ')}`
          );
          return;
        }
  
        sendSuggestion(interaction, 'command');
      } catch (error) {
        console.error(error);
        console.log(`Error in /suggest: ${error}`);
      }
    },
  };
  