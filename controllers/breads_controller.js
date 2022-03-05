const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX page for localhost:3000/breads
breads.get('/', (req, res) => {
  Bread.find()  
  .then(foundBreads => {
    res.render('index',
    {
      breads: foundBreads,
      title: 'Index Page'
    }
  )
  })
})

// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = 'undefined'
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .then(foundBread => {
          res.render('show', {
              bread: foundBread
          })
      })
      .catch(err => {
        res.send('404')
      })
})

// Old SHOW endpoint before connecting MongoDB
// SHOW
//breads.get('/:arrayIndex', (req, res) => {
//  if (Bread[req.params.arrayIndex]) {
//    res.render('show', { 
//      bread:Bread[req.params.arrayIndex],
//      index: req.params.arrayIndex,
//    })
//  } else {
//    res.send('<h1>404 Page Not Found<h1/>')
//  }
//})

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})

// DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})

module.exports = breads