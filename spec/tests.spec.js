const datefns = require("date-fns");

function description(msg) {
    return `• ${msg}`;
}
describe("\n  ► Trivial logics", function () {
    test(description("Return a random value inside an array"), function () {
        var colors = ["#f2499d", "#8ee5f5", "#64f59e"];
        expect(colors).toContain(
            colors[Math.floor(Math.random() * colors.length)]
        );
    });
    test(description("Only two decimals for float type"), function () {
        function winRate(ataq, bloq) {
            return (ataq + bloq / 100).toFixed(2);
        }

        expect(winRate(150, 80)).toBe("150.80");
    });
    test(description("Return string with date inside"), function () {
        function consolePrefix(date) {
            return `[SERENO | ${datefns.format(date, "dd/MM/yyyy HH:mm:ss")}]`;
        }
        expect(typeof consolePrefix(new Date())).toBe("string");
        expect(typeof consolePrefix(new Date())).not.toBe("date");
    });
    test(description("Return a value in range"), function () {
        function randomInRange(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        expect(randomInRange(0, 1) === 0 || randomInRange(0, 1) === 1).toBe(
            true
        );
        expect(randomInRange(0, 1) === 3).toBe(false);
    });
});

describe("► Bot logics", function () {});
