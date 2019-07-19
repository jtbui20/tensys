/*
Class game
Inputs:
- NameA (String Literal) -> Represents the name of PlayerA
- NameB (String Literal) -> Represents the name of PlayerB

Functions:
- addPoint (Player) (Public function)
    - (Player) as Input -> Represents the player which has won a point.
    - return (c) -> Returns the status of the player's score being reset. Useful for determining when a game or set is won.
- returnScore (c) (Public function)
    - (c) as Input (Default = null) -> Represents the player whose's information should be returned
    - return -> Returns a string containing information based on c and the current score
0 returnScoreCompressed (c) (Public function)
    - Pretty much the same thing except for the return value which is heavily compressed

*/
class game {
    // Initialize the two players
    constructor(NameA, NameB, BestOf) {
        this.PlayerA = new player(NameA, (BestOf + 1) / 2)
        this.PlayerB = new player(NameB, (BestOf + 1) / 2)
        this.PointNo = 0
        this.BestOf = BestOf
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
        return (this.PointNo + "|" + this.PlayerA.set + "," + this.PlayerA.game + "," + this.PlayerA.point + "|" + this.PlayerB.set + "," + this.PlayerB.game + "," + this.PlayerB.point)
    }

    addToObject() {
        var t = {}
        t.PN = this.PointNo
        t.A = this.PlayerA.raw
        t.B = this.PlayerB.raw
        t.retScore = this.returnScore_compressed()
        this.score.push({
            PN: t.PN,
            A: t.A,
            B: t.B,
            retScore: t.retScore
        })
    }
}