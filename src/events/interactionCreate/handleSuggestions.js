const { Interaction } = require('discord.js');
const Suggestion = require('../../models/Suggestion'); // Ensure this path is correct
const formatResults = require('../../utils/formatResults');


/**
 * Handles button interactions for suggestions.
 * @param {Interaction} interaction 
 */
module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId) return;

    try {
        const [type, suggestionId, action] = interaction.customId.split('.');

        if (type !== 'suggestion' || !suggestionId || !action) return;

        await interaction.deferReply({ ephemeral: true });

        const targetSuggestion = await Suggestion.findOne({ suggestionId });
        if (!targetSuggestion) {
            await interaction.editReply('Suggestion not found.');
            return;
        }

        const targetMessage = await interaction.channel.messages.fetch(targetSuggestion.messageId);
        const targetMessageEmbed = targetMessage.embeds[0];

        if (action === 'approve') {
            if (!interaction.member.permissions.has('Administrator')) {
                await interaction.editReply('You do not have permission to approve suggestions.');
                return;
            }

            targetSuggestion.status = 'approved';
            targetMessageEmbed.data.color = 0x84e660; // Approved color
            targetMessageEmbed.fields[1].value = '✅ Approved';

            await targetSuggestion.save();
            await interaction.editReply('Suggestion approved!');

            await targetMessage.edit({
                embeds: [targetMessageEmbed],
                components: [targetMessage.components[0]], // Keeps only the upvote/downvote buttons
            });

            return;
        }

        if (action === 'reject') {
            if (!interaction.member.permissions.has('Administrator')) {
                await interaction.editReply('You do not have permission to reject suggestions.');
                return;
            }

            targetSuggestion.status = 'rejected';
            targetMessageEmbed.data.color = 0xff6161; // Rejected color
            targetMessageEmbed.fields[1].value = '🗑️ Rejected';

            await targetSuggestion.save();
            await interaction.editReply('Suggestion rejected!');

            await targetMessage.edit({
                embeds: [targetMessageEmbed],
                components: [targetMessage.components[0]], // Keeps only the upvote/downvote buttons
            });

            return;
        }

        if (action === 'upvote') {
            const hasVoted = targetSuggestion.upvotes.includes(interaction.user.id) || targetSuggestion.downvotes.includes(interaction.user.id);

            if (hasVoted) {
                await interaction.editReply('You have already casted your vote for this suggestion.');
                return;
            }

            targetSuggestion.upvotes.push(interaction.user.id);
            await targetSuggestion.save();

            await interaction.editReply('Upvoted suggestion!');

            targetMessageEmbed.fields[2].value = formatResults(targetSuggestion.upvotes, targetSuggestion.downvotes);

            await targetMessage.edit({
                embeds: [targetMessageEmbed],
            });

            return;
        }

        if (action === 'downvote') {
            const hasVoted = targetSuggestion.upvotes.includes(interaction.user.id) || targetSuggestion.downvotes.includes(interaction.user.id);

            if (hasVoted) {
                await interaction.editReply('You have already casted your vote for this suggestion.');
                return;
            }

            targetSuggestion.downvotes.push(interaction.user.id);
            await targetSuggestion.save();

            await interaction.editReply('Downvoted suggestion!');

            targetMessageEmbed.fields[2].value = formatResults(targetSuggestion.upvotes, targetSuggestion.downvotes);

            await targetMessage.edit({
                embeds: [targetMessageEmbed],
            });

            return;
        }
    } catch (error) {
        console.log(`Error in handleSuggestions.js: ${error}`);
    }
};

