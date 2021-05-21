const discordAPI = require("discord.js");
const credentials = require("./credentials.json");
/* const db = require("./db"); */
const axios = require("axios");

// BOT AND USEFUL CONST/VARIABLES
const bot = new discordAPI.Client();
const prefix = credentials.prefix;
const consolePrefix = credentials.consolePrefix;

// INIT
bot.login(credentials.botToken)
    .then()
    .catch((err) => {
        console.log(err);
    });

bot.on("ready", () => {
    console.log(`${consolePrefix} Beep boop!`);
});

/* axios.get("http://127.0.0.1:8000/api/fighters/").then((res) =>{
}) */
// MESSAGE ENG

var fightParticipants = [];
bot.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const EntireMessage = message.content;
    const argsAsArray = message.content.slice(prefix.length).trim().split(" ");
    const command = argsAsArray.shift().toLowerCase();
    let colors = ["#f2499d", "#8ee5f5", "#64f59e", "#846ffc", "#9af5a3"];
    function embedMsg(
        title,
        frstFighterName,
        frstFighterTeam,
        scndFighterName,
        scndFighterTeam
    ) {
        let embed = new discordAPI.MessageEmbed();

        embed
            .setColor(
                `${colors[Math.floor(Math.random() * colors.length)]}` // CHOOSE A RANDOM COLOR
            )
            .setTitle(title)
            .addFields(
                {
                    name: frstFighterName,
                    value: frstFighterTeam,
                    inline: true,
                },
                {
                    name: scndFighterName,
                    value: scndFighterTeam,
                    inline: true,
                }
            );

        return message.channel.send(embed);
    }

    if (command == "fight") {
        fightParticipants.push({
            id: `${message.author.id}`,
            username: `${message.author.username}`,
            fighter1: `${argsAsArray[0]}`,
            fighter2: `${argsAsArray[1]}`,
            fighter3: `${argsAsArray[2]}`,
            fighter4: `${argsAsArray[3]}`,
            fighter5: `${argsAsArray[4]}`,
            fighter6: `${argsAsArray[5]}`,
        });
        // REACT AND DELETE AFTER 3s
        message.react("👍");
        message
            .delete({ timeout: 5000 })
            .then()
            .catch((err) => {
                console.log(err);
            });
    }
    if (command == "emb") {
        embedMsg("A luta vai começar", "a", "a");
    }
    if (fightParticipants.length == 2) {
        let frstParticipant = fightParticipants.shift();
        let scndParticipant = fightParticipants.shift();

        let frstParticipantName = frstParticipant.username;
        let scndParticipantName = scndParticipant.username;
        function participantTeamArray(participant) {
            let fightersArray = [];
            fightersArray.push(participant.fighter1);
            fightersArray.push(participant.fighter2);
            fightersArray.push(participant.fighter3);
            fightersArray.push(participant.fighter4);
            fightersArray.push(participant.fighter5);
            fightersArray.push(participant.fighter6);

            return fightersArray;
        }

        embedMsg(
            "A luta vai começar...",
            frstParticipantName,
            participantTeamArray(frstParticipant),
            scndParticipantName,
            participantTeamArray(scndParticipant)
        );
    }
});
