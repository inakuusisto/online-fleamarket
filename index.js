const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');
const functions = require('./models/models.js');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const awsS3Url = "https://s3.amazonaws.com/inasfleamarket";


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


var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});



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



app.get('/user', function(req, res) {
    functions.getUserData(req.session.user.email).then(function(results) {
        res.json({user: results.rows[0]});
    }).catch(function(err) {
        console.log(err);
    });
});


app.post('/updateProfilePic', uploader.single('file'), function(req, res) {

    if (req.file) {
        functions.sendFile(req.file).then(function() {
            res.json({
                success: true,
                fileName: req.file.filename
            });
            functions.addImgToDb(req.file.filename, req.body.userId);
        }).catch(function(err){
            res.status(500).json({ err: 'Failure'});
        });
    } else {
        res.status(500).json({ err: 'Failure'});
    }
});


app.post('/uploadNewItem', uploader.single('file'), function(req, res) {

    if (req.file) {
        functions.sendFile(req.file).then(function() {
            res.json({
                success: true,
                fileName: req.file.filename
            });
            functions.addNewItemToDb(req.file.filename, req.body.userId, req.body.title, req.body.price, req.body.description);
        }).catch(function(err){
            res.status(500).json({ err: 'Failure'});
        });
    } else {
        res.status(500).json({ err: 'Failure'});
    }
});

app.get('/ownItems', function(req, res) {
    functions.getOwnItems(req.session.user.userId).then(function(results) {
        for(var i=0; i<results.rows.length; i++) {
            if(results.rows[i].image) {
                results.rows[i].image = awsS3Url + '/' + results.rows[i].image;
            }
        }
        res.json({ownItems: results.rows});
    }).catch(function(error) {
        console.log(error);
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
