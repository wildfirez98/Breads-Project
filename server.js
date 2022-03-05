// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)
const app = express()


// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

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