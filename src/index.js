const { Client } = require('discord.js');
const { CommandKit } = require('commandkit');
const mongoose = require('mongoose');
require('dotenv/config');

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

// Initialize CommandKit to manage commands and events
new CommandKit({
  client,
  commandsPath: `${__dirname}/commands`,
  eventsPath: `${__dirname}/events`,
  bulkRegister: true,
});

// Connect to MongoDB and login the bot
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
  client.login(process.env.TOKEN);
});

// Register the command for a specific guild when the bot is ready
client.once('ready', async () => {
  const guild = client.guilds.cache.get('1301073378538426448'); // Replace with your server's ID

  if (guild) {
    // Register the config-suggestions command for this guild only
    const command = require('./commands/config-suggestions'); // Adjust path if needed
    await guild.commands.set([command.data]);
    console.log('Registered commands for guild only');
  } else {
    console.log("Couldn't find the guild. Make sure the bot is in the server.");
  }

  console.log(`${client.user.tag} is online!`);
});
