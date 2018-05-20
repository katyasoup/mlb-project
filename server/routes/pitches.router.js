const express = require('express');
const pool = require('../modules/pool.js');
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

router.get('/:id/types', (req, res) => {
    pool.query("SELECT autopitchtype, COUNT(*) AS pitchcount FROM pitches WHERE pitcherid = $1 GROUP BY autopitchtype ORDER BY pitchcount;", [req.params.id], (err, result) => {
        if (err) {
            console.log("Error retrieving data: ", err);
            res.sendStatus(500);
        }else {
            res.send(result.rows);
        }
    });
})
module.exports = router;
