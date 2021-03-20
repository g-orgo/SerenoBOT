const discordBOT = require('discord.js');
const discordCredentials = require ('./credentials')

const bot = new discordBOT.Client()

bot.login(discordCredentials.botToken)

bot.on('ready', ()=>{
    console.log(`Sereno logged in!\n${discordCredentials.oAuth2URL}\n`)
})