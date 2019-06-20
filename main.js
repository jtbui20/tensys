var width = 1000,
    height = 520

var view_width = 100,
    view_height = 52,
    view_xScale = 1;
    view_yScale = 1;

var graphic, trendline, circles, rearground

var _game = new game()

SVG.on(document, "DOMContentLoaded", () => {
    // Initialize Game Object
    // Initialize Event Handlers for Buttons
    document.getElementById("addPlayerA").addEventListener("click", () => add("A"))
    document.getElementById("addPlayerB").addEventListener("click", () => add("B"))
    document.getElementById("scrollLeft").addEventListener("click", () => Scroll("out"))
    document.getElementById("scrollRight").addEventListener("click", () => Scroll("in"))
    document.getElementById("scrollUp").addEventListener("click", () => Scroll("up"))
    document.getElementById("scrollDown").addEventListener("click", () => Scroll("down"))
    // Initialize SVG Component
    // Initialize in HEIRARCHY PLZ
    graphic = SVG('graphic').size(width, height).viewbox(0,(view_height) / -2, view_width, view_height)
    rearground = graphic.group()
    trendline = graphic.polyline().stroke({ width: 0.5 }).fill('none')
    circles = graphic.group()
    // Compulsory Initiators
    drawScore(0)
    rearground.line(0, 0, 100, 0).stroke({ width: 0.2, color: "#333" })
})

function add(player) {
    var c = 0
    switch (player) {
        case "A":
            c = _game.addPoint(_game.PlayerA)
            break
        case "B":
            c = _game.addPoint(_game.PlayerB)
            break
    }
    drawScore(c)
    console.log(_game.returnScore_compressed())
}

function drawScore(condition) {
    // Position is the difference between scores
    var _location = _game.score[_game.PointNo].B - _game.score[_game.PointNo].A
    // Get reference of array
    var e = trendline.array().value
    e.push([_game.PointNo, _location])
    trendline.plot(e)
    // Prepare circle groups
    var _cs = circles.group()
    var _c = _cs.circle(0.5).move(_game.PointNo - 0.25, _location - 0.25).fill("#f00").data({ score: _game.returnScore() })

    _c.mouseover(() => {
        _cs.text(_c.data('score')).font({ size: 2 }).move(_c.x() + 1, _c.y() + 1)
    })

    _c.mouseout(() => {
        _cs.last().clear()
    })

    switch (condition) {
        case 1:
            drawGame("green")
            break
        case 2:
            drawGame("blue")
            break
    }
}

function Scroll(direction) {
    var _vb = graphic.viewbox()
    if (direction == "in") graphic.viewbox(_vb.x - 1, _vb.y, _vb.width, _vb.height)
    if (direction == "out") if (_vb.x <= 30) graphic.viewbox(_vb.x + 1, _vb.y, _vb.width, _vb.height)
    if (direction == "up") graphic.viewbox(_vb.x, _vb.y + 1, _vb.width, _vb.height)
    if (direction == "down") graphic.viewbox(_vb.x, _vb.y - 1, _vb.width, _vb.height)
}

function drawGame(_color) {
    rearground.line(_game.PointNo, -50, _game.PointNo, 50).stroke({width: 0.5, color: _color})
}

// Make object to manage draw