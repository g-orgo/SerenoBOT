////////////////////////////////////////////////////////////////////////////////////INITIAL AREA
const datefns = require("date-fns");
const discordAPI = require("discord.js");
const credentials = require("./credentials.json");
const axios = require("axios");

// BOT AND USEFUL CONST/VARIABLES
const bot = new discordAPI.Client();
const prefix = "!";
var fightParticipants = [];

function consolePrefix(date) {
    return `[SERENO | ${datefns.format(date, "dd/MM/yyyy HH:mm:ss")}]`;
}
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// INIT
bot.login(credentials.botToken)
    .then()
    .catch((err) => {
        console.log(err);
    });

bot.on("ready", () => {
    fightParticipants = [];
    console.log(`${consolePrefix(new Date())} Beep boop!`);
});

const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

let colors = [
    "#f2499d",
    "#8ee5f5",
    "#64f59e",
    "#846ffc",
    "#9af5a3",
    "#5ea872",
    "#8b6fa8",
    "#dfe089",
    "#f5ad7a",
    "#be68d9",
    "#c26399",
];
let emotes = ["👍", "✌️", "✅", "🔥", "✨", "👌"];
function embedMsg(
    title,
    frstFieldName,
    frstFieldTxt,
    scndFieldName,
    scndFieldTxt
) {
    let embed = new discordAPI.MessageEmbed();

    embed
        .setColor(`${colors[Math.floor(Math.random() * colors.length)]}`)
        .setTitle(title)
        .addFields(
            {
                name: frstFieldName,
                value: frstFieldTxt,
                inline: true,
            },
            {
                name: scndFieldName,
                value: scndFieldTxt,
                inline: true,
            }
        );
    return message.channel.send(embed);
}
////////////////////////////////////////////////////////////////////////////////////INITIAL AREA
