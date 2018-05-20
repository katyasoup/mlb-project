const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

// get all shortlist data
router.get('/', (req, res) => {
    pool.query("SELECT * FROM favorites WHERE owner = $1", [req.user.id], (err, result) => {
        if (err) {
            console.log("Error retrieving data: ", err);
            res.sendStatus(500);
        } else {
            res.send(result.rows);
        }
    });
});

// get shortlisted pitcher by ID
router.get('/:id', (req, res) => {
    let pitcher = req.params.id;
    let owner = req.user.id;
    pool.query("SELECT * FROM favorites WHERE pitcherid = $1 AND owner = $2;", [pitcher, owner], (err, result) => {
        if (err) {
            console.log("Error retrieving data:", err);
            res.sendStatus(500);
        } else {
            res.send(result.rows);
        }
    });
});

// add pitcher to shortlist
router.post('/:id', (req, res) => {
    var newFave = {
        owner: req.user.id,
        pitcherid: req.params.id
    }
    pool.query("INSERT INTO favorites (owner, pitcherid) VALUES ($1, $2)", [newFave.owner, newFave.pitcherid], (err, result) => {
        if (err) {
            console.log("Error retrieving data: ", err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
})

// update notes for one specific pitcher
router.put('/:id', (req, res) => {
    var newNote = {
        owner: req.user.id,
        pitcherid: req.params.id,
        notes: req.body.notes
    };
    pool.query("UPDATE favorites SET notes = $1 WHERE pitcherid = $2 AND owner = $3", [newNote.notes, newNote.pitcherid, newNote.owner], (err, result) => {
        if (err) {
            console.log("Error retrieving data: ", err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
})

// remove pitcher from shortlist
router.delete('/delete/:id', (req, res) => {
    let pitcher = req.params.id;
    let owner = req.user.id;
    pool.query("DELETE FROM favorites WHERE pitcherid = $1 and owner = $2;", [pitcher, owner], (err, result) => {
        if (err) {
            console.log("Error removing data: ", err);
            res.sendStatus(500);
        } else {
            res.sendStatus(202);
        }
    })
});

module.exports = router;