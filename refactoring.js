const discordAPI = require("discord.js");
const utils = require("./handlers/utils");
const botUtils = require("./handlers/botUtils");
// BOT AND USEFUL CONST/VARIABLES
const bot = new discordAPI.Client();
const prefix = "!";

// INIT
botUtils.botInit()

bot.on("message", ()=>{
    botUtils.botDRY()
})