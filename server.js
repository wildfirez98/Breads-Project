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
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// ROUTES
app.get('/', (req, res) => {
    res.send('<h1>Welcome to an Awesome App about Breads<h1/>')
})
  
// Breads endpoint
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// 404 Endpoint
app.get('*', (req, res) => {
    res.send('<h1>404 Page Not Found<h1/>')
})

// LISTEN
app.listen(PORT, () => {
  console.log('Eating Bread at PORT', PORT);
})