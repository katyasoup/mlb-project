const express = require('express');
const pool = require('../pool.js');
const router = express.Router();

// GET all pitch data
router.get('/', (req, res) => {
    pool.query("SELECT DISTINCT PitcherID FROM pitches", (err, result) => {
        if (err) {
            console.log("Error retrieving data: ", err);
            res.sendStatus(500);
        } else {
            res.send(result.rows);
        }
    });
});

router.get('/:id', (req, res) => {
    pool.query("SELECT * FROM pitches WHERE PitcherID = $1", [req.params.id], (err, result) => {
        if (err) {
            console.log("Error retrieving data: ", err);
            res.sendStatus(500);
        }else {
            res.send(result.rows);
        }
    });
})
module.exports = router;
