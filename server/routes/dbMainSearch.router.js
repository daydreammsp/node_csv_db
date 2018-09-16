const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const request = require("request");



    router.post('/', (req, res) => {
        
        let columnName = req.body.column
        let queryVar = req.body.search
        console.log("logged http", columnName,queryVar)
        let queryText = `SELECT * FROM inspections
        WHERE ${columnName} LIKE '%${queryVar}%';`
        pool.query(queryText)
         .then((result)=>{
             console.log(result.rows)
        res.send(result.rows);
        }).catch((err)=>{
        console.log(err);
        res.sendStatus(500)
        })
        
})

       
    module.exports = router;