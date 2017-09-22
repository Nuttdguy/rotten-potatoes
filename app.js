const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const body_parser = require('body-parser'); // required to perform POST
const method_override = require('method-override');

const app = express();


// CONFIGURE APPLICATION PROPERTIES FOR HANDLING VIEWS
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(body_parser.urlencoded({extended: true}));
app.use(method_override('_method'));


// CONNECT TO MONGO-DB
mongoose.connect('mongodb://localhost/rotten-potatoes');


let Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    rating: Number
});

// ROUTES ============

app.get('/', function (req, res) {
    Review.find(function (err, reviews) {
        res.render('reviews-index', {reviews: reviews})
    });
});

app.get('/reviews/new', function (req, res) {
    res.render('./reviews/reviews-new', {});
});

app.post('/reviews', function (req, res) {
    Review.create(req.body, (err, review) => {
        res.redirect('/')
    });
});

app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('./reviews/reviews-show', {review}) // { review: review }
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        console.log(review);
        res.render('./reviews/review-edit', {review})

    }).catch((err) => {
        console.log(err);
    })
});

app.put('/reviews/:id', (req, res) => {
    Review.findOneAndUpdate(req.params.id, req.body, ((review) => {
        res.redirect('/reviews/' + review._id, { review });
    })).catch((err) => {
        console.log(err);
    });
});

app.delete('/reviews/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id, () => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err);
    })
});

// domain.com/someid/?name=jojo&age=33

// app.get('/:any', (req, res) => {
// req.params.any <- someid
// req.query.name <-  = jojo
//}

// app.get('/:year/:month/:date/:title')

// SERVER ===============

// EVENT LISTENER, WHICH LISTENS FOR REQUEST, RESPONSE EVENTS TO PORT 3000
app.listen(3000, function () {
    console.log('Portfolio App listening on port 3000');
});





