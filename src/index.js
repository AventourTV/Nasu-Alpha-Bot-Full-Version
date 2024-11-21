const { Client, IntentsBitField, ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { CommandKit } = require('commandkit');
const mongoose = require('mongoose');
require('dotenv').config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

new CommandKit({
  client,
  commandsPath: `${__dirname}/commands`,
  eventsPath: `${__dirname}/events`,
});

// Import the welcome message functionality
require('./events/joinMessage/welcomeMessage')(client);

client.on('ready', (c) => {
  console.log(`✅ | ${c.user.tag} is online.`);
  client.user.setActivity({
    name: 'discord.gg/nasualpha',
    type: ActivityType.Custom,
  });
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
  client.login(process.env.TOKEN);
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
