/* import Discord from 'discord.js';
import { clientMock, messageMock } from '../__mocks__/discordMocks'; */
const utils = require("../handlers/utils");
function description(msg) {
    return `• ${msg}`;
}
describe("\n  ► Trivial logics", function () {

    test(description("Return string with date inside"), function () {
        expect(typeof utils.consolePrefix(new Date())).toBe("string");
        expect(typeof utils.consolePrefix(new Date())).not.toBe("date");
    });
    test(description("Return a value in range"), function () {
        expect(
            utils.randomInRange(0, 1) === 0 || utils.randomInRange(0, 1) === 1
        ).toBe(true);
        expect(utils.randomInRange(0, 1) === 3).toBe(false);
    });
});
