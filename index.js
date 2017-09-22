const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');



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


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


app.listen(8080, function() {console.log("I'm listening.");});
