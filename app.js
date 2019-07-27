const express = require("express"),
    app = express(),
    fs = require("fs"),
    bodyParser = require("body-parser")
const port = 3000

app.use(express.static('src'))
app.use(express.static('.'))
app.use(express.static('tenengine'))
app.use(express.json())

app.listen(port, () => console.log(port))

app.get("/", function (req, res){
    res.sendFile("index.html");
})

app.post("/save", function(req, res) {
    var file = req.body.info.PlayerA + "v" + req.body.info.PlayerB
    fs.writeFile("./matches/" + file + ".txt", req.body.history, (error) => {
        if (error) throw error;
        res.send()
    })
})

app.post("/load", function (req, res) {
    console.log(req.body)
    res.send("sucess")
})