//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// INITIAL AREA
const datefns = require("date-fns");
const discordAPI = require("discord.js");
const credentials = require("./credentials.json");
const axios = require("axios");

// BOT AND USEFUL CONST/VARIABLES
const bot = new discordAPI.Client();
const prefix = credentials.prefix;
/* const consolePrefix = `${credentials.consolePrefix} | ${setInterval(consoleTimer, 1000)}]: `; */
const consolePrefix = credentials.consolePrefix;
const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

var fightParticipants = [];

// INIT
bot.login(credentials.botToken)
    .then()
    .catch((err) => {
        console.log(err);
    });

bot.on("ready", () => {
    fightParticipants = [];
    console.log(
        `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n${consolePrefix} | ${datefns.format(
            new Date(),
            "dd/MM/yyyy HH:mm:ss"
        )}]: Beep boop!`
    );
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// INITIAL AREA

// MESSAGE ENG
bot.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// YELLOW AREA
    const EntireMessage = message.content;
    const argsAsArray = message.content.slice(prefix.length).trim().split(" ");
    const command = argsAsArray.shift().toLowerCase();
    let colors = ["#f2499d", "#8ee5f5", "#64f59e", "#846ffc", "#9af5a3"];
    let emotes = ["👍", "✌️", "✅", "🔥", "✨", "👌"];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// YELLOW AREA
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// RED AREA
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
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// RED AREA
    if (command == "list") {
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// YELLOW AREA
        axios.get("http://127.0.0.1:8000/api/fighters/").then((res) => {
            let data = res.data;
            let fighterNames = [];
            let fighterTokens = [];

            for (index in data) {
                fighterNames.push(
                    data[index].fighter_name.charAt(0).toUpperCase() +
                        data[index].fighter_name.slice(1)
                );
                fighterTokens.push(data[index].fighter_token);
            }
            message.react("📜");
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// YELLOW AREA
            embedMsg(
                "Escolha um lutador:",
                "Lutadores",
                fighterNames,
                "Token",
                fighterTokens
            );
            console.log(
                `${consolePrefix} | ${datefns.format(
                    new Date(),
                    "dd/MM/yyyy HH:mm:ss"
                )}]: ${message.author.username}#${
                    message.author.discriminator
                } consultou a lista de lutadores disponíveis!`
            );
        });
        message
            .delete({ timeout: 2000 })
            .then()
            .catch((err) => {
                console.log(err);
            });
    }

    if (command == "debug") {
        message.delete({ timeout: 1000 }).then();
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// YELLOW AREA
    if (command == "fight") {
        fightParticipants.push({
            id: `${message.author.id}`,
            username: `${message.author.username}#${message.author.discriminator}`,
            fighter1: `${argsAsArray[0]}`,
            fighter2: `${argsAsArray[1]}`,
            fighter3: `${argsAsArray[2]}`,
            fighter4: `${argsAsArray[3]}`,
            fighter5: `${argsAsArray[4]}`,
            fighter6: `${argsAsArray[5]}`,
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// YELLOW AREA
        // REACT AND DELETE AFTER 5s
        message.react(`${emotes[Math.floor(Math.random() * emotes.length)]}`);
        message
            .delete({ timeout: 3000 })
            .then()
            .catch((err) => {
                console.log(err);
            });
    }

    if (fightParticipants.length == 2) {
        let frstParticipant = fightParticipants.shift();
        let scndParticipant = fightParticipants.shift();

        let frstParticipantName = frstParticipant.username;
        let scndParticipantName = scndParticipant.username;

        let fhgterObjArray = [];
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// YELLOW AREA
        function participantTeamArray(participant) {
            let frstFighter = participant.fighter1;
            let scndFighter = participant.fighter2;
            let thrdFighter = participant.fighter3;
            let frthFighter = participant.fighter4;
            let fithFighter = participant.fighter5;
            let sxthFighter = participant.fighter6;
            let fightersArray = [];

            fightersArray.push(frstFighter);
            fightersArray.push(scndFighter);
            fightersArray.push(thrdFighter);
            fightersArray.push(frthFighter);
            fightersArray.push(fithFighter);
            fightersArray.push(sxthFighter);

            axios.get("http://127.0.0.1:8000/api/fighters/").then((res) => {
                let data = res.data;

                for (index in fightersArray) {
                    let fghtersData = data.find(
                        (fighters) =>
                            fighters.fighter_token === `${fightersArray[index]}`
                    );
                    fhgterObjArray.push(fghtersData);
                }
            });
            return fightersArray;
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// YELLOW AREA
        console.log(
            `${consolePrefix} | ${datefns.format(
                new Date(),
                "dd/MM/yyyy HH:mm:ss"
            )}]: ${frstParticipantName} chamou ${scndParticipantName} pra briga!`
        );

        embedMsg(
            "A luta vai começar...",
            frstParticipantName,
            participantTeamArray(frstParticipant),
            scndParticipantName,
            participantTeamArray(scndParticipant)
        );

        function fightSttsEngine(frstfighterArray, scndfighterArray) {
            for (index in frstfighterArray) {
                let ataq =
                    frstfighterArray[index].fighter_stts.for +
                    frstfighterArray[index].fighter_stts.des;
                frstfighterArray[index].fighter_stts.ataq = ataq;

                let agi =
                    scndfighterArray[index].fighter_stts.def -
                    frstfighterArray[index].fighter_stts.des * 0.7;
                frstfighterArray[index].fighter_stts.agi = parseFloat(
                    agi.toFixed(2)
                );

                let bloq =
                    frstfighterArray[index].fighter_stts.ataq -
                    frstfighterArray[index].fighter_stts.agi;

                /* if(bloq <= 0){
                        frstfighterArray[index].fighter_stts.bloq = 
                    } */
                frstfighterArray[index].fighter_stts.bloq = parseFloat(
                    bloq.toFixed(2)
                );
            }
            return frstfighterArray;
        }

        setTimeout(() => {
            for (index in fhgterObjArray) {
                if (fhgterObjArray[index].fighter_type == "FGHTR") {
                    fhgterObjArray[index].fighter_stts = {
                        for: randomInRange(70, 90),
                        des: randomInRange(30, 55),
                        def: randomInRange(40, 50),
                    };
                }
                if (fhgterObjArray[index].fighter_type == "TNK") {
                    fhgterObjArray[index].fighter_stts = {
                        for: randomInRange(35, 45),
                        des: randomInRange(30, 45),
                        def: randomInRange(90, 110),
                    };
                }
            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// YELLOW AREA
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// RED AREA
            let frstparticipantTeam = fhgterObjArray.splice(0, 6);
            let scndparticipantTeam = fhgterObjArray.splice(0, 6);

            let frstTeamWithStts = fightSttsEngine(
                frstparticipantTeam,
                scndparticipantTeam
            );
            let scndTeamWithStts = fightSttsEngine(
                scndparticipantTeam,
                frstparticipantTeam
            );

            function winRate(ataq, bloq) {
                let calculate = (ataq + bloq / 100).toFixed(2);

                return calculate;
            }

            function letItRip() {
                let roundMessages = {
                    frstRoundMsgs: ["Começa o primeiro round!"],
                    scndRoundMsgs: ["E rola o segundo round!"],
                    thrdRoundMsgs: ["Vamos de terceiro round!"],
                    frthRoundMsgs: ["Mas que quarto round esplendido!"],
                    ftthRoundMsgs: ["Estamos perto de uma vitória incrível!"],
                    sixtRoundMsgs: ["Round decisivo!"],
                };
                let roundTimeouts = [2000, 4000, 6000, 8000, 10000, 12000]; // TIME BETWEEN ROUNDS SET TO 2s

                let roundFightersArray = [];

                // FIGHTERS PER ROUND SEPARATOR
                for (index in frstTeamWithStts) {
                    /* 
                        I've tried while loop but it seems not to work inside life-cycled functions like this message()
                        So i'm using an 6length array instead.
                    */
                    let roundFighter = {
                        names: [
                            frstTeamWithStts[index].fighter_name
                                .charAt(0)
                                .toUpperCase() +
                                frstTeamWithStts[index].fighter_name.slice(1),
                            scndTeamWithStts[index].fighter_name
                                .charAt(0)
                                .toUpperCase() +
                                scndTeamWithStts[index].fighter_name.slice(1),
                        ],
                        stts: [
                            frstTeamWithStts[index].fighter_stts,
                            scndTeamWithStts[index].fighter_stts,
                        ],
                    };
                    roundFightersArray.push(roundFighter);
                }

                // ROUND SYS
                let teamOneNames = [];
                let teamTwoNames = [];
                let teamOneStts = [];
                let teamTwoStts = [];
                for (index in roundFightersArray) {
                    let count = index; // Idk why but it seems not to work if i didn't declare a count for it, may be some setTimeout() issue

                    teamOneNames.push(roundFightersArray[count].names.shift());
                    teamTwoNames.push(roundFightersArray[count].names.shift());
                    teamOneStts.push(roundFightersArray[count].stts.shift());
                    teamTwoStts.push(roundFightersArray[count].stts.shift());

                    setTimeout(() => {
                        //ROUNDS
                        console.log(
                            `\nROUND ${parseInt(count)+1}:\n${teamOneNames[count]} | ${teamOneStts[count]}\n${teamTwoNames[count]} | ${teamTwoStts[count]}\n\n`
                        );
                    }, roundTimeouts[count]);
                }

                return;
            }

            letItRip();
            /* // FIRST ROUND
            setTimeout(() => {
                let roundOneFighterOne = frstTeamWithStts[0];
                let roundOneFighterTwo = scndTeamWithStts[0];

                let roundOnenames = [
                    roundOneFighterOne.fighter_name.charAt(0).toUpperCase() +
                        roundOneFighterOne.fighter_name.slice(1),
                    roundOneFighterTwo.fighter_name.charAt(0).toUpperCase() +
                        roundOneFighterTwo.fighter_name.slice(1),
                ];

                let roundOneFighterOneWinRate = winRate(
                    roundOneFighterOne.fighter_stts.ataq,
                    roundOneFighterOne.fighter_stts.bloq
                );

                let roundOneFighterTwoWinRate = winRate(
                    roundOneFighterTwo.fighter_stts.ataq,
                    roundOneFighterTwo.fighter_stts.bloq
                );

                let roundOneWinner = [];

                if (roundOneFighterOneWinRate > roundOneFighterTwoWinRate) {
                    let msg = embedMsg(
                        "E rola o primeiro round!",
                        "Lutadores",
                        roundOnenames,
                        "Vencedor",
                        roundOneFighterOne.fighter_name
                    );

                    roundOneWinner.push(
                        roundOneFighterOne.fighter_name
                            .charAt(0)
                            .toUpperCase() +
                            roundOneFighterOne.fighter_name.slice(1)
                    );
                    return msg;
                }
                if (roundOneFighterOneWinRate < roundOneFighterTwoWinRate) {
                    let msg = embedMsg(
                        "E rola o primeiro round!",
                        "Lutadores",
                        roundOnenames,
                        "Vencedor",
                        roundOneFighterTwo.fighter_name
                            .charAt(0)
                            .toUpperCase() +
                            roundOneFighterTwo.fighter_name.slice(1)
                    );

                    roundOneWinner.push(
                        roundOneFighterTwo.fighter_name
                            .charAt(0)
                            .toUpperCase() +
                            roundOneFighterTwo.fighter_name.slice(1)
                    );
                    return msg;
                }
                console.log(
                    `${consolePrefix} ${roundOneWinner.shift()} ganhou o round um`
                );
            }, 3000);

            // SECOND ROUND
            setTimeout(() => {
                let roundTwoFighterOne = frstTeamWithStts[1];
                let roundTwoFighterTwo = scndTeamWithStts[1];

                let roundTwonames = [
                    roundTwoFighterOne.fighter_name.charAt(0).toUpperCase() +
                        roundTwoFighterOne.fighter_name.slice(1),
                    roundTwoFighterTwo.fighter_name.charAt(0).toUpperCase() +
                        roundTwoFighterTwo.fighter_name.slice(1),
                ];

                let roundTwoFighterOneWinRate = winRate(
                    roundTwoFighterOne.fighter_stts.ataq,
                    roundTwoFighterOne.fighter_stts.bloq
                );

                let roundTwoFighterTwoWinRate = winRate(
                    roundTwoFighterTwo.fighter_stts.ataq,
                    roundTwoFighterTwo.fighter_stts.bloq
                );

                let roundTwoWinner = [];

                if (roundTwoFighterOneWinRate > roundTwoFighterTwoWinRate) {
                    let msg = embedMsg(
                        "E rola o primeiro round!",
                        "Lutadores",
                        roundTwonames,
                        "Vencedor",
                        roundTwoFighterOne.fighter_name
                    );

                    roundTwoWinner.push(
                        roundTwoFighterOne.fighter_name
                            .charAt(0)
                            .toUpperCase() +
                            roundTwoFighterOne.fighter_name.slice(1)
                    );
                    return msg;
                }
                if (roundTwoFighterOneWinRate < roundTwoFighterTwoWinRate) {
                    let msg = embedMsg(
                        "Segundo round, guerreiros!",
                        "Lutadores",
                        roundTwonames,
                        "Vencedor",
                        roundTwoFighterTwo.fighter_name
                            .charAt(0)
                            .toUpperCase() +
                            roundTwoFighterTwo.fighter_name.slice(1)
                    );

                    roundTwoWinner.push(
                        roundTwoFighterTwo.fighter_name
                            .charAt(0)
                            .toUpperCase() +
                            roundTwoFighterTwo.fighter_name.slice(1)
                    );
                    return msg;
                }
                console.log(
                    `${consolePrefix} ${roundTwoWinner.shift()} ganhou o round dois`
                );
            }, 4000); */
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// RED AREA
        }, 1000);
    }
});
