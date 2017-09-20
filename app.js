const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

// CONFIGURE APPLICATION PROPERTIES FOR HANDLING VIEWS
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let reviews = [
    {title: 'Great Review'},
    {title: 'Next Review'}
];


// ROUTES ============

// GET REQUEST ENDPOINT FOR HANDING INDEX/ROOT PAGE REQUESTS
// app.get('/', function (req, res) {
//     res.render('home', {msg: 'Hello World!'})
// });

app.get('/', function (req, res) {
    res.render('reviews-index', {reviews: reviews})
});



// SERVER ===============

// EVENT LISTENER, WHICH LISTENS FOR REQUEST, RESPONSE EVENTS TO PORT 3000
app.listen(3000, function () {
    console.log('Portfolio App listening on port 3000');
});





