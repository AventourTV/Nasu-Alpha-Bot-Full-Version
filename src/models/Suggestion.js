const { Schema, model } = require('mongoose');
const { randomUUID } = require('crypto');

const suggestionSchema = new Schema({
    suggestionId: {
        type: String,
        default: randomUUID,
    },
    authorId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    messageId: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending', // Correct the spelling if it was "deafult"
    },
    upvotes: {
        type: Array,
        default: [],
    },
    downvotes: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

module.exports = model('Suggestion', suggestionSchema);
