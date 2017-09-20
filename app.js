const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const body_parser = require('body-parser'); // required to perform POST

const app = express();

// CONFIGURE APPLICATION PROPERTIES FOR HANDLING VIEWS
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(body_parser.urlencoded({extended: true}))

// CONNECT TO MONGO-DB
mongoose.connect('mongodb://localhost/rotten-potatoes');


let Review = mongoose.model('Review', {
    title: String
});

// ROUTES ============

app.get('/', function (req, res) {

    // USE THE MONGOOSE OBJECT MODEL, USE FIND METHOD
    Review.find(function (err, reviews) {

        // PASS RESULT TO RENDER IN INDEX USING REVIEWS AS VARIABLE
        res.render('reviews-index', {reviews: reviews})
    })
});

app.get('/reviews/new', function (req, res) {
    res.render('./reviews/reviews-new', {});
});

app.post('/reviews', function (req, res) {
    res.render('reviews-index');
    // console.log(req.body);
});


// SERVER ===============

// EVENT LISTENER, WHICH LISTENS FOR REQUEST, RESPONSE EVENTS TO PORT 3000
app.listen(3000, function () {
    console.log('Portfolio App listening on port 3000');
});





