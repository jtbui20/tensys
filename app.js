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

app.get("/", (req, res) => {
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

app.get("/app/:id", (req, res) => {
    res.send(req.params)
})

app.get("/view/retrieve", (req, res) => {
    
    let db = new sqlite.Database("./matches/directory.db")
    db.all("SELECT * FROM dir", [], (err, rows) => {
        if (err) throw err
        console.log(rows)
        res.send(rows)
    })
    db.close()
})

app.post("/tenengine/save", (req, res) => {
    content = req.body.info
    console.log(content)
    if (content.PlayerA == "" || content.PlayerB == "" || content.BestOf == "") {
        res.send("One or more entries were blank")
        return
    }
    if (!content.PlayerA.match(/^[a-z]*$/i) || !content.PlayerB.match(/^[a-z]*$/i)) {
        res.send("One or more Player fields are invalid, please reinput.")
        return
    }
    if (!content.BestOf.match(/^[0-9]+$/)) {
        res.send("Best of is not a valid figure")
        return
    }

    file = content.PlayerA + "v" + content.PlayerB
    path = "./matches/" + file + ".txt"
    isExists = false
    fs.exists(path, (bool) => isExists = bool)
    fs.writeFile(path, req.body.history, (error) => {
        if (error) throw error;

        let db = new sqlite.Database("./matches/directory.db")
        if (isExists) {
            db.run(`UPDATE dir SET nameA = "${content.PlayerA}", nameB = "${content.PlayerB}" WHERE path = "${path}"`)
            console.log(`Updated ${content.PlayerA} vs ${content.PlayerB} at ${path}`)
        } else {
            var count = db.run('SELECT COUNT (id) FROM dir')
            db.run(`INSERT INTO dir (id, nameA, nameB, path) VALUES ("${count + 1}","${ content.PlayerA}", "${content.PlayerB}", "${path}")`)
            console.log(`Saved ${content.PlayerA} vs ${content.PlayerB} at ${path}`)
        }
        db.close()
        res.send("success")
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