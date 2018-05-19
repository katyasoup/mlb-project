const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

// GET all shortlist data
router.get('/', (req, res) => {
    console.log('HIT faves route');
    
    pool.query("SELECT * FROM favorites WHERE owner = $1", [req.user.id], (err, result) => {
        if (err) {
            console.log("Error retrieving data: ", err);
            res.sendStatus(500);
        } else {
            res.send(result.rows);
        }
    });
});

router.post('/:id', (req, res) => {
    var newFave = {
        owner: req.user.id,
        pitcherid: req.params.id
      }
      console.log('new fave', newFave);
      
    pool.query("INSERT INTO favorites (owner, pitcherid) VALUES ($1, $2)", [newFave.owner, newFave.pitcherid], (err, result) => {
        if (err) {
            console.log("Error retrieving data: ", err);
            res.sendStatus(500);
        }else {
            res.sendStatus(201);
        }
    });
})
module.exports = router;
