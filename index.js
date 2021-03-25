const discordAPI = require('discord.js');
const credentials = require('./credentials.json')

// BOT AND USEFUL CONST/VARIABLES
const bot = new discordAPI.Client()
const prefix = credentials.prefix
const consolePrefix = credentials.consolePrefix

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
        // ADD A REACTION TO THE EMIT MESSAGE, DELETE IT AFTER 1s AND THEN CREATES A REPLY
        let twitchChannel = args.shift()
        let shareMessage = message.content.slice(5 + twitchChannel.length)
        let colors = ['#f2499d', '#8ee5f5', '#64f59e', '#846ffc', '#9af5a3']

        // MESSAGE
        const embedMsg = new discordAPI.MessageEmbed()
        .setColor(`${colors[Math.floor(Math.random()*colors.length)]}`) // CHOOSE A RANDOM COLOR
        .setTitle('STREAM ON!! :exploding_head: :exploding_head: ')
        .setDescription(`${shareMessage} \n ${twitchChannel}`)

        message.channel.send(embedMsg)

        // REACT AND DELETE AFTER 5s
        message.react('👍')
        message.delete({timeout: 1000})
        .then()
        .catch(err => {console.log(err)})

        // LOG
        console.log(`${consolePrefix} ${message.author.tag} utilizou o comando "${command}"`)
    };
})
