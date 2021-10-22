const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    price:{ type:Number , minimum: 0},
    qty: { type:Number , minimum: 0},
    isInCart: {type:Boolean, default: false}
},
{ timestamps: true }
);

const Gear = mongoose.model('Product', gearSchema);

module.exports = Gear;