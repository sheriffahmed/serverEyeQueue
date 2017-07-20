var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('mongoose')
var app = express()
var httpServer = require('http').Server(app)
var io = require('socket.io')(httpServer)
var models = require('./models')
var randomstring = require('randomstring')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send("hi")
})

app.get('/user', (req, res) =>{
	models.User.findOne().lean().exec((err, user) => {
		res.send(user)
	})
})

app.get('/meals', (req, res) => {
	models.Meal.find().lean().exec((err, meals)=>{
		res.send(meals)
	})
})

app.get('/restaurants', (req, res) => {
	models.Restaurant.find().lean().exec((err, restaurants)=>{
		res.send(restaurants)
	})
})

app.post('/order', (req, res) =>{
	var order = models.Order(req.body)

	order.orderNumber = randomstring.generate({
		length: 4,
		charset: 'alphanumeric',
		capitalization: 'uppercase'
	})

	order.save(()=>{
		models.Order.populate(order, {path: "meal user"}, (err, order) =>{
			var orderData = order.toJSON();
			io.sockets.emit('newOrder', orderData)
			console.log(orderData)
			res.send(orderData)
		})
	})
})

httpServer.listen(3000, ()=>{
	console.log('listening on port 3000')
})

io.on('connection', (socket)=>{
	console.log('connection')

	socket.on('orderReady', (order)=>{
		console.log('order ready', order)
		io.sockets.emit('orderReady', order)
	})
})

mongoose.connect('mongodb://localhost/eyeQueue')