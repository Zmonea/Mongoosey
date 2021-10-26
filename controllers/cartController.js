const express = require('express')
const conGear = express.Router()
const Cart = require(`../models/cart.js`)
const Gear = require('../models/gear.js')



conGear.get('/cart', (req, res)=>{
    Cart.find({}, (error, products)=>{
        res.render('cart.ejs', {
            product: products,
            
        });
    });
});

conGear.post('/cart', (req, res)=>{

    Cart.create(req.body, (error, products) => {

        res.redirect('/cart');
        
    })
    
});



conGear.put('/gear/:id/addCart', (req, res)=>{
    

    Gear.findByIdAndUpdate(req.params.id, {$inc: {qty:-1}}, {new:true}, (err, updatedModel)=>{
            
        
    });
    // Cart.post(addedProduct, (error, data) => {
        
    // });
    let addedProduct = Gear.findByIdAndUpdate(req.params.id, {new:true}, (err, updatedModel)=>{
        

        
    });

    Cart.create(addedProduct, (error, products) => {

        
    })


    res.redirect(`/gear`);
});

// conGear.post('/gear/:id/add', (req, res)=>{
    
    
//     // Cart.post(addedProduct, (error, data) => {
        
//     // });


//     res.redirect(`/gear`);
// });


// conGear.addToCart = (req, res, next) => {
//     const addedProduct = Gear.findById(req.body.id)[0];
//     Cart.save(addedProduct);
//     res.redirect('/cart');
// }

conGear.delete('/cart/:id', (req, res)=>{
    Cart.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/cart');
    });
});



module.exports = conGear;