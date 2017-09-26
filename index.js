const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');
const functions = require('./models/models.js');



//      SETUP

if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cookieSession({
    secret: 'funny string',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));


app.use(express.static(__dirname + '/public/'));



//      Routes


app.get('/home', function(req, res) {
    if(req.session.user) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


app.get('/', function(req, res) {
    if(!req.session.user) {
        res.redirect('home');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});



app.post('/register', function(req, res) {
    // console.log(req.body);
    functions.hashPassword(req.body.password).then(function(hash) {
        functions.addUserData(req.body.userName, req.body.email, hash).then(function(results) {
            req.session.user = {
                userId: results.rows[0].id,
                userName: req.body.userName,
                email: req.body.email
            };
            res.json({
                success: true
            });
        }).catch(function(err) {
            res.status(500).json({err:'failure'});
        });
    }).catch(function(err) {
        res.status(500).json({err:'failure'});
    });
});


app.post('/login', function(req, res) {
    functions.getUserData(req.body.email).then(function(results) {
        functions.checkPassword(req.body.password, results.rows[0].password).then(function(doesMatch) {
            if(doesMatch) {
                // console.log('###macth');
                req.session.user = {
                    userId: results.rows[0].id,
                    userName: req.body.userName,
                    email: req.body.email
                };
                res.json({
                    success: true
                });
            } else {
                res.status(500).json({ err: 'Failure'});
            }
        }).catch(function(err){
            res.status(500).json({ err: 'Failure'});
        });
    }).catch(function(err){
        res.status(500).json({ err: 'Failure'});
    });
});



app.get('/profile', function(req, res) {
    functions.getUserData(req.session.user.email).then(function(results) {
        res.json(results.rows[0]);
    }).catch(function(err) {
        console.log(err);
    });
});


app.get('*', function(req, res) {
    if(!req.session.user) {
        res.redirect('/home');
    }
    res.sendFile(__dirname + '/index.html');
});


// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });


app.listen(8080, function() {console.log("I'm listening.");});
