const discordAPI = require('discord.js');
const expressApp = require ('./server')
const credentials = require('./credentials')

const bot = new discordAPI.Client()
const port = credentials.port
const app = expressApp
const discordCredentials = credentials.discordCredentials
const prefix = '!'

// INIT
bot.login(discordCredentials.botToken)
.then()
.catch((err)=>{console.log(err)})

bot.on('ready', ()=>{
    console.log(`[SERENO]: Beep boop!`)
})


// MESSAGE ENG
bot.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send(`${message.id}`);
        /* message.delete(`${message.id}`) */
    }else if(command === 'beep'){
        message.channel.send('boop garaio');
    };
})