describe("Trivial logics", function () {
    it("| Return random color system", function () {
        var colors = ["#f2499d", "#8ee5f5", "#64f59e"];
        expect(colors).toContain(
            colors[Math.floor(Math.random() * colors.length)]
        );
    });
    it("| Winrate system", function () {
        let ataq = 150;
        let bloq = 80;
        expect((ataq + bloq / 100).toFixed(2)).toBe("150.80");
    });
});
