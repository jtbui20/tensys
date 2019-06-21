class game {
    // Initialize the two players
    constructor(NameA, NameB) {
        this.PlayerA = new player(NameA)
        this.PlayerB = new player(NameB)
        this.PointNo = 0
        this.TieBreak = false
        this.score = [{
            "PN": 0,
            "A": 0,
            "B": 0,
            "retScore": "----"
        }]
    }

    addPoint(Player) {
        var OtherPlayer = (Player == this.PlayerA) ? this.PlayerB : this.PlayerA
        if (this.TieBreak == true) {
            Player.addPoint_TieBreak(OtherPlayer.point)
            var c = Player.updateStat(OtherPlayer.game)
            OtherPlayer.reset(c)
            this.TieBreak = (c >= 1) ? false : true
        } else {
            var resetParam = Player.addPoint(OtherPlayer.point)
            OtherPlayer.point = (resetParam == -1) ? 40 : OtherPlayer.point
            var c = Player.updateStat(OtherPlayer.game)
            OtherPlayer.reset(c)
            this.TieBreak = (c == 4) ? true : false
        }
        this.PointNo += 1
        this.addToObject()
        return (c)
    }

    returnScore(c) {
        switch (c) {
            case "a":
                return (this.PlayerA.set + " | " + this.PlayerA.game + " | " + this.PlayerA.point)
            case "b":
                return (this.PlayerB.set + " | " + this.PlayerB.game + " | " + this.PlayerB.point)
            default:
                return (this.PlayerA.set + " | " + this.PlayerA.game + " | " + this.PlayerA.point + "\n" + this.PlayerB.set + " | " + this.PlayerB.game + " | " + this.PlayerB.point)
        }

    }

    returnScore_compressed() {
        return ("#" + this.PointNo + "|" + this.PlayerA.set + "," + this.PlayerA.game + "," + this.PlayerA.point + "|" + this.PlayerB.set + "," + this.PlayerB.game + "," + this.PlayerB.point)
    }

    addToObject() {
        var t = {}
        t.PN = this.PointNo
        t.A = this.PlayerA.raw
        t.B = this.PlayerB.raw
        t.retScore = this.returnScore()
        this.score.push({
            PN: t.PN,
            A: t.A,
            B: t.B,
            retScore: t.retScore
        })
    }
}