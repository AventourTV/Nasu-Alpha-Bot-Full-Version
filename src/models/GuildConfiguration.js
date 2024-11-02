const mongoose = require('mongoose');

const GuildConfigurationSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  suggestionChannelIds: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('GuildConfiguration', GuildConfigurationSchema);
