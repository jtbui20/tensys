class player {
    // Initialize statistics for player
    constructor() {
        this.name = "Player"
        this.raw = 0
        this.point = 0
        this.game = 0
        this.set = 0
    }
    // A function to append the score
    addPoint(opponentScore = 0) {
        this.raw += 1
        if (this.point == 40) {
            if (opponentScore == 40) {
                this.point = "Adv"
            } else if (opponentScore == "Adv") {
                return "-1"
            } else {
                this.point = "win"
            }
        } else {
            switch (this.point) {
                case 0:
                    this.point = 15
                    break
                case 15:
                    this.point = 30
                    break
                case 30:
                    this.point = 40
                    break
                case "Adv":
                    this.point = "win"
                    break
                default:
                    break
            }
        }
    }
    // A special tie breaker addition to the addPoint
    addPoint_TieBreak(opponentScore = 0) {
        this.raw += 1
        this.point += 1
        if (this.point >= 6) if (this.point - opponentScore >= 2) this.point = "win"; return 1
    }
    updateStat(opponentGame = 0) {
        // Return Values of UpdateStat()
        // Default: return nothing
        // 1: Game won
        // 2: Set won
        // 3: Match won
        var returnVal = 0
        // Update point to Game
        if (this.point == "win") {
            this.point = 0
            this.game += 1
            returnVal = 1
        }
        // Update Game to Set
        // The games are AFTER CHANGE
        if (this.point != 0) return

        if (this.game == 7) {
            this.game = 0
            this.set += 1
            returnVal = 2
        } else if (this.game == 6) {
            if (opponentGame == 6) {
                returnVal = 4
            } else if (opponentGame == 5) {
                returnVal = 1
            } else {
                this.game = 0
                this.set += 1
                returnVal = 2
            }
        }
        // Update set to Match
        if (this.set == 3) returnVal = 3
        return returnVal
    }
    reset(level) {
        // Restores scores based on updateStat from opponent
        // Default: return nothing
        // 1: Game won
        // 2: Set won
        // 3: Match won
        if (level >= 1) this.point = 0
        if (level != 4) {
            if (level >= 2) this.game = 0
            if (level >= 3) this.set = 0
        }
    }
}