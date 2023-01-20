const express = require('express');
const router = express.Router();

// import express validator
const { body, validationResult } = require('express-validator');

// import database
const connection = require('../config/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res) {
  connection.query('SELECT * FROM posts ORDER BY id desc', function (err, rows){
    if(err){
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error'
      })
    }else{
      return res.status(200).json({
        status: true,
        message: 'List Data Posts successfully',
        data: rows
      })
    }
  });
});

/**
 * STORE POST
 */
router.post('/store', [
  body('title').notEmpty(),
  body('content').notEmpty()
], (req, res) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(422).json({
      error: error.array()
    });
  }

  // define formData
  let formData = {
    title: req.body.title,
    content: req.body.content
  }

  connection.query(`INSERT INTO posts SET ?`, formData, function(err, rows) {
    // if(err) throw err
    if(err){
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      })
    }else{
      return res.status(200).json({
        status: true,
        message: 'Inserted successfully',
        data: rows[0]
      })
    }
  })

})

/**
 * SHOW POST
 */
router.get('/(:id)', function(req, res){
  let id = req.params.id;

  connection.query(`SELECT * FROM posts WHERE id=${id}` , function (err, rows){
    if (err){
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      })
    }

    // if post not found
    if(rows.length <= 0){
      return res.status(404).json({
        status: false,
        message: 'Data Post Not Found',
      })
    }else{
      return res.status(200).json({
        status: true,
        message: 'Detail Data Post',
        data: rows[0]
      })
    }
  })
})

/**
 * UPDATE POST
 */
router.patch('/update/(:id)', [
  // validation
  body('title').notEmpty(),
  body('content').notEmpty()
], (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({
      errors: errors.array()
    });
  }

  let id = req.params.id;

  let formData = {
    title: req.body.title,
    content: req.body.content
  }

  // update query
  connection.query(`UPDATE posts SET ? WHERE id = ${id}`, formData, function(err, rows){
    // if(err) throw err
    if(err){
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error'
      })
    }else{
      return res.status(200).json({
        status: true,
        message: 'Update Data Successfully'
      })
    }
  })
})

/**
 * DELETE POST 
 */
router.delete('/delete/(:id)', function(req, res){
  let id = req.params.id
  connection.query(`DELETE FROM posts WHERE id = ${id}`, function(err, rows){
    //if(err) throw err
    if(err){
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error'
      })
    }else{
      return res.status(200).json({
        status: true,
        message: 'Delete data successfully'
      })
    }


  })
})

module.exports = router;
