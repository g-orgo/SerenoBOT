const discordAPI = require('discord.js');
const credentials = require('./credentials.json')

const bot = new discordAPI.Client()
const prefix = '!'
const consolePrefix = '[SERENO]:'
const twChannels = {
    name: "",
    url: ""
}

// INIT
bot.login(credentials.botToken)
.then()
.catch((err)=>{console.log(err)})

bot.on('ready', ()=>{
    console.log(`${consolePrefix} Beep boop!`)
})

// MESSAGE ENG
bot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if(command == 'tw'){
        // DIVULGA A STREAM, ACRESCENTA UMA REAÇÃO E DEPOIS DE 5s DELETA A MENSAGEM DE DISPARO
        // WIP: Fazer algo para que ele capture uma mensagem junto ao link da twitch
        let twitchChannel = args[0]
        message.channel.send(`@here Canal na twitch :point_right: ${twitchChannel}`)
        message.react('👍')
        message.delete({timeout: 5000})
        .then()
        .catch(err => {console.log(err)})

    }; 
    if(command == 'beep'){
        message.channel.send('boop! eu ainda estou funcionando.');
    };

    // WIP: Fazer com que ele divida o comando do canal na twitch
    console.log(`${consolePrefix} ${message.author.tag} utilizou o comando "${message}"`)
})