function description(msg){
    return `| ${msg}`
}
describe("Trivial logics", function () {
    test(description("Return a random value in range"), function () {
        var colors = ["#f2499d", "#8ee5f5", "#64f59e"];
        expect(colors).toContain(
            colors[Math.floor(Math.random() * colors.length)]
        );
    });

    test(description("Winrate system"), function () {
        let ataq = 150;
        let bloq = 80;
        expect((ataq + bloq / 100).toFixed(2)).toBe("150.80");
    });
});
