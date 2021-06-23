const discordAPI = require("discord.js");
const bot = new discordAPI.Client();
const utils = require("./handlers/utils");
const credentials = require("./credentials.json");

module.exports.botInit = function () {
    //
    // Initialize bot and send a message to show it's workin'
    //
    bot.login(credentials.botToken);

    bot.on("ready", () => {
        console.log(`\n\n${utils.consolePrefix(new Date())} Beep boop!`);
    });
};

module.exports.botDRY = function () {
    //
    // Bot handlers and a DRY system
    //
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const argsAsArray = message.content.slice(prefix.length).trim().split(" ");
    const command = argsAsArray.shift().toLowerCase();
};
