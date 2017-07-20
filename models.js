var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = Schema({
  id: Schema.Types.ObjectId,
  username: Schema.Types.String,
  password: Schema.Types.String,
  paymentMethods: [
    Schema.Types.Mixed
  ],
  phoneNumber: Schema.Types.String,
  email: Schema.Types.String,
  picture:  Schema.Types.String,
  firstName: Schema.Types.String,
  lastName: Schema.Types.String
});

var mealSchema = Schema({
  id: Schema.Types.ObjectId,
  picture: Schema.Types.String,
  name: Schema.Types.String,
  description: Schema.Types.String,
  price: Schema.Types.Number,
  prepTime: Schema.Types.Number,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
})

var orderSchema = Schema({
	id: Schema.Types.ObjectId,
 	meal: {
 		type: Schema.Types.ObjectId,
 		ref: 'Meal'
 	},
 	total: Schema.Types.Number,
 	paymentMethodId: Schema.Types.ObjectId,
 	user: {
 		type: Schema.Types.ObjectId,
 		ref: 'User'
 	},
  orderNumber: Schema.Types.String
})

var restaurantSchema = Schema({
  id: Schema.Types.ObjectId,
  picture: Schema.Types.String,
  name: Schema.Types.String,
  phoneNumber: Schema.Types.String,
  email: Schema.Types.String,
  location: {
    type: [Schema.Types.Number],
    index: '2d'
  },
  formattedAddress: Schema.Types.String,
  description: Schema.Types.String,
  priceRange: Schema.Types.String
})

var User = mongoose.model('User', userSchema);
var Meal = mongoose.model('Meal', mealSchema);
var Order = mongoose.model('Order', orderSchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
  User,
  Meal,
  Order,
  Restaurant
}