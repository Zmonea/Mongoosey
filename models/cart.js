const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    price:{ type:Number , minimum: 0},
    qty: { type:Number , minimum: 0},
    isInCart: {type:Boolean, default: false}
},
{ timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;