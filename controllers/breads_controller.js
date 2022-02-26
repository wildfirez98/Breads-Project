const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
    res.render('index',
      {
        breads: Bread,
        title: 'Index Page'
      }
    )
  // res.send(Bread)
})

// SHOW
// SHOW
breads.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.render('show', { 
      bread:Bread[req.params.arrayIndex]
    })
  } else {
    res.send('<h1>404 Page Not Found<h1/>')
  }
})
module.exports = breads