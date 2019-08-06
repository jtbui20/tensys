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
app.use(express.urlencoded())

app.listen(port, () => console.log(`Running on ${port}`))

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/src/home.html");
})

app.get("/app", (req, res) => {
    res.sendFile(__dirname + "/src/tensys.html");
})

app.get("/view", (req, res) => {
    res.sendFile(__dirname + "/src/search.html")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/src/login.html")
})

app.get("/user/:username", (req, res) => {
    console.log('param')
    res.send(req.params)
})

app.post("/tenengine/save", (req, res) => {
    let db = new sqlite.Database("./matches/directory.db")
        content = req.body.info
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

app.post("/login", (req, res) => {
    let db = new sqlite.Database("./testfiles/test_logins.db")
    let cmd = "SELECT * FROM logins WHERE username=?"
    console.log(req.body.username)
    console.log(req.body.password)
    db.get(cmd, [req.body.username], (err, row) => {
        if (err) throw err;
        if (row == null) res.send("fail")
        else if (req.body.password == row.password) res.send("success")
        else res.send("fail")
    });
})