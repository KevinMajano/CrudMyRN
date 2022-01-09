const express = require('express');
const peliculas = express.Router();
const db = require('../db/database');


peliculas.get("/", (req,res)=>{
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    })
})

peliculas.post("/insert", (req,res)=>{
    const movie_name = req.body.movie_name;
    const movie_review = req.body.movie_review;

    const sqlInsert = "INSERT INTO movie_reviews (movie_name,movie_review) VALUES (?,?)";
    db.query(sqlInsert,[movie_name,movie_review],(err,result)=>{
        res.send(result);
    })
})

peliculas.put("/update",(req,res)=>{
    const id = req.body.id;
    const movie_name = req.body.movie_name;
    const movie_review = req.body.movie_review;

    const sqlUpdate = "UPDATE movie_reviews SET movie_name = ?, movie_review = ? WHERE id = ? ";
    db.query(sqlUpdate,[movie_name,movie_review,id],(err,result)=>{
        res.send(result);
    })
})

peliculas.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";
    db.query(sqlDelete,id,(err,result)=>{
        res.send(result);
    })
})

module.exports = peliculas;