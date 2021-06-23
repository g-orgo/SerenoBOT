const datefns = require("date-fns");

module.exports.consolePrefix = function (date) {
    if (date == null) {
        return `[SERENO | ${datefns.format(
            new Date(),
            "dd/MM/yyyy HH:mm:ss"
        )}]`;
    } else {
        return `[SERENO | ${datefns.format(date, "dd/MM/yyyy HH:mm:ss")}]`;
    }
};

module.exports.randomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
