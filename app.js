const express = require("express"),
    app = express(),
    fs = require("fs"),
    bodyParser = require("body-parser"),
    sqlite = require('sqlite3'),
    
    port = 80

app.use(express.static('src'))
app.use(express.static('.'))
app.use(express.static('tenengine'))
app.use(express.json())

app.listen(port, () => console.log(`Running on ${port}`))

app.get("/", (req, res) => {
    res.sendFile("index.html");
})

app.post("/tenengine/save", (req, res) => {
    let db = new sqlite.Database("./matches/directory.db"),
        content = req.body.info,
        file = content.PlayerA + "v" + content.PlayerB
        path = "./matches/" + file + ".txt"

    fs.writeFile(path , req.body.history, (error) => {
        if (error) throw error;
        db.run(`INSERT INTO dir (nameA, nameB, path) VALUES ("${ content.PlayerA}", "${content.PlayerB}", "${path}")`)
        console.log(`Saved ${content.PlayerA} vs ${content.PlayerB} at ${path}`)
        db.close()
        res.send()
    })
})

app.post("/tenengine/load", (req, res) => {
    console.log(req.body)
})

app.get("/search", (req, res) => {
    res.sendFile("search.html")
})

app.post("/search/retrieve")