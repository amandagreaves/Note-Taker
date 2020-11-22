var fs = require("fs");
var path = require("path");
var storeData = require("../db/db.json");

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.json(storeData);
        console.log(storeData);
    });

    app.post("/api/notes", function (req, res) {

        let newNote = req.body;
        newNote['id'] = Date.now();
        storeData.push(newNote);

        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(storeData), function (err) {
            if (err) throw err;
        });

        res.json(newNote);
    });

    app.delete("/api/notes/:id", function (req, res) {
        storeData = storeData.filter((note) => note.id != req.params.id);

        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(storeData), function (err) {
            if (err) throw err;
        });
        res.json({ ok: true });
    });
};