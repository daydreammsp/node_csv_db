const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const request = require("request");



    router.post('/', (req, res) => {
        console.log("logged http",req.body)
        // let columName = req.body.colum
        // let queryVar = req.body.query
        // let queryText = `SELECT * FROM inspections
        // WHERE ${columName} LIKE '%${queryVar}%'`;
        // pool.query(queryText)
        //  .then((result)=>{
        // res.sendStatus(201);
        // }).catch((err)=>{
        // console.log(err);
        // res.sendStatus(500)
        // })
})

       
    module.exports = router;