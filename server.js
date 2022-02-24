// DEPENDENCIES
const express = require('express')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
})
  
// Breads endpoint
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// 404 Endpoint
app.get('*', (req, res) => {
    res.send('404 Page Not Found')
})

// LISTEN
app.listen(PORT, () => {
  console.log('Eating Bread at PORT', PORT);
})