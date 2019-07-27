var width = 1000,
    height = 520

var view_width = 100,
    view_height = 52,
    view_xScale = 1;
    view_yScale = 1;

var graphic, trendline, circles, rearground

var _game = new game("PlayerA", "PlayerB", 5)

SVG.on(document, "DOMContentLoaded", () => {
    // Initialize Game Object
    // Initialize Event Handlers for Buttons
    document.getElementById("addPlayerA").addEventListener("click", () => add("A"))
    document.getElementById("addPlayerB").addEventListener("click", () => add("B"))
    document.getElementById("scrollLeft").addEventListener("click", () => Scroll("out"))
    document.getElementById("scrollRight").addEventListener("click", () => Scroll("in"))
    document.getElementById("scrollUp").addEventListener("click", () => Scroll("up"))
    document.getElementById("scrollDown").addEventListener("click", () => Scroll("down"))

    document.getElementById("saveGraph").addEventListener("click", save)
    document.getElementById("loadGraph").addEventListener("click", load)
    // Initialize SVG Component
    graphic = SVG('graphic').size(width, height).viewbox(0,(view_height) / -2, view_width, view_height)
    // Initialize layers here
    rearground = graphic.group()
    trendline = graphic.polyline().stroke({ width: 0.5 }).fill('none')
    circles = graphic.group()
    infobox = graphic.group()
    // Compulsory Initiators
    drawScore(0)
    rearground.line(0, 0, 1000, 0).stroke({ width: 0.2, color: "#333" })
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
        infobox.rect(8, 6).move(_c.x() + 0.5, _c.y() + 0.5).fill({color: "#999", opacity: 0.6})
        infobox.text(_c.data('score')).font({size: 2}).move(_c.x() + 1, _c.y() + 1).fill('#fff')
    })

    _c.mouseout(() => {
        infobox.clear()
    })
    switch (condition) {
        case 1: case 4:
            drawGame("green")
            break
        case 2:
            drawGame("blue")
            // Make a new graph?
            break
        case 3:
            drawGame("yellow")
            break
    }
}

function Scroll(direction) {
    var _vb = graphic.viewbox()
    if (direction == "in") graphic.viewbox(_vb.x - 10, _vb.y, _vb.width, _vb.height)
    if (direction == "out")graphic.viewbox(_vb.x + 10, _vb.y, _vb.width, _vb.height)
    if (direction == "up") graphic.viewbox(_vb.x, _vb.y + 10, _vb.width, _vb.height)
    if (direction == "down") graphic.viewbox(_vb.x, _vb.y - 10, _vb.width, _vb.height)
}

function drawGame(_color) {
    rearground.line(_game.PointNo, -50, _game.PointNo, 50).stroke({width: 0.5, color: _color})
}

function resizeGraph() {
    
}
// Make object to manage draw

function Automate() {
    _game.PlayerA.name = "Roger Federer"
    _game.PlayerB.name = "Novak Djokovic"
    var input = "B B A B B A A A A A B B B A B B A A A B B A B A B B A A A A A B B B B A A B A A B B B B A A B A A B B B A A B B B A A A B A A B A A B B A B B A A A A B A A A B B B B A A A A B B A B B A A A A A B B B A B B A A A B B A B A B B A A A A A B B B B A A B A A B B B B A A B A A B B B A A B B B A A A B A A B A A B B A B B A A A A B A A A B B B B A A A A A B B B B B A B A B B B B B A B B B B A A B B A A A B A B A A B B B B B B B B A B B B A B A A B A B B B B A A B A A B A B B B B A A A A B B B B A A A B A A B A B B B B A B A B A A A B B B B B A A A A A A A B A A B B B A A A A B A A A B A B B B A A A A B B A B A A B B B A B B B B B B B A B A B B B B A B A A B A A A A A B A B B B B"
    input.split(" ").forEach(key => {
        add(key);
    })
}

function save() {
    $.ajax({
        type: "POST",
        url: "save",
        data: JSON.stringify(_game.export()),
        success: function (response) {
            alert("Graph has been saved")
        },
        contentType: "application/json"
    });
}

function load() {
    $.ajax({
        type: "POST",
        url: "load",
        data: document.getElementById('file').innerText,
        success: function (response) {
            alert("Graph has been retrieved")
        },
        contentType: "application/json"
    })
}