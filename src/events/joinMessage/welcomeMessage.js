module.exports = (client) => {
    client.on('guildMemberAdd', async (member) => {
        const embedMessage = {
            content: null,
            embeds: [
                {
                    color: 2815,
                    image: {
                        url: "https://cdn.discordapp.com/attachments/1302127233300697129/1306938477442633799/nasu_welcome_banner.png?ex=67387cce&is=67372b4e&hm=d1ccc396ddb6cc23fb2cabbb47378a428022b825cbe3f0f09eebc847cb0f9d81&"
                    }
                },
                {
                    title: "Welcome to NASU ALPHA",
                    description: 
                        `• Welcome **${member.user.username}**, We're excited to have you here! In our server, you’ll get a complete introduction, set up your trading tools, and gain access to our analyst signals and educational materials to help you get started.\n\n` +
                        "• For your safety, we strongly suggest **turning off** DMs from anyone within the Nasu Alpha server. Unfortunately, there are impersonators who may pose as David or other team members, attempting to **scam** members. If you receive a suspicious DM, **REPORT it and IGNORE** it!\n\n" +
                        "• **REMEMBER: Nasu Alpha staff will NEVER DM you first.**\n\n" +
                        "To disable DMs, follow these steps:\n\n" +
                        "> 1. Right-click on the server icon.\n" +
                        "> 2. Select **Privacy Settings**.\n" +
                        "> 3. Toggle **Direct Messages** off.\n" +
                        "> 4. Click **Done**.\n\n" +
                        "Check out <#1301146842796527688> for more info",
                    color: 2815,
                    image: {
                        url: "https://cdn.discordapp.com/attachments/1302127233300697129/1305837147584200794/welcomeembedbar.png?ex=67347b1d&is=6733299d&hm=3c8338f2aa39257e37d7faff3dc28cf68609d7b0a08f6264fa4b1a06e9daf711&"
                    }
                }
            ],
            attachments: []
        };

        try {
            // Send the embed message to the new member
            await member.send({ embeds: embedMessage.embeds });
        } catch (error) {
            console.error(`Could not send welcome message to ${member.user.tag}:`, error);
        }
    });
};
