//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const session = require('express-session')
const router = express.Router()

const cartController = require('./controllers/cartController.js');
const sessionsController = require('./controllers/sessions.js')
const userController = require('./controllers/controller.js')


const Gear = require('./models/gear.js');
const prdseed = require('./models/gearseed.js')
const Cart = require('./models/cart.js')

//MiddleWare
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.json());




app.use(
    session({
      secret: process.env.SECRET, 
      resave: false, 
      saveUninitialized: false 
    })
)
app.use('/', cartController)
app.use('/sessions', sessionsController)
app.use('/users', userController)



app.get('/gear/new', (req, res)=>{
    res.render('new.ejs');
});

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;


// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
// app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
// app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
// app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
// app.get('/gear' , (req, res) => {
//   res.send('Hello World!');
// });

app.post('/gear/', (req, res)=>{

    Gear.create(req.body, (error, products) => {

        res.redirect('/gear/'+ products._id);
        
    })
    
});

//index
app.get('/gear', (req, res)=>{
    Gear.find({}, (error, products)=>{
        res.render('index.ejs', {
            product: products,
            index: req.params,
            currentUser: req.session.currentUser
        });
    });
});



//show 
app.get('/gear/:id', (req, res)=>{
    Gear.findById(req.params.id, (err, products)=>{
        res.render('show.ejs', {
            product: products
        });
    });
});

//edit




app.put('/gear/:id', (req, res)=>{
  
    Gear.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/gear');
        
    });
})

app.get('/gear/:id/edit', (req, res)=>{
    Gear.findById(req.params.id, (err, products)=>{
        res.render('edit.ejs', {
            product: products
        });
    });
});
//cart


// app.put('/cart/buy', (req, res)=>{
    
        

//     Cart.findByIdAndUpdate(req.params.id, {$inc: {qty:-1}}, {new:true}, (err, updatedModel)=>{
        
//         res.redirect(`/cart`);
        
//     });
// })


//seed
app.get('/seed', (req, res) => {
    
    Gear.deleteMany({}, ()=> {});
    Cart.deleteMany({}, ()=> {});
    
    Gear.create(prdseed, (error, data) => {
      
    });

    Cart.create(prdseed, (error, data) => {
        
      });

    res.redirect('/gear'); 
      
  })

// Buy goods
app.put('/gear/:id/buy', (req, res)=>{
    
        

    Gear.findByIdAndUpdate(req.params.id, {$inc: {qty:-1}}, {new:true}, (err, updatedModel)=>{
        
        res.redirect(`/gear/${req.params.id}`);
        
    });
});


// app.post('/addCart', cartController.addToCart);

  

  app.delete('/gear/:id', (req, res)=>{
    Gear.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/gear');
    });
});

app.get('/', (req, res) => {
    res.redirect('/gear')
})


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));