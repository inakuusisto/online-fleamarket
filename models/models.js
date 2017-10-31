const spicedPg = require('spiced-pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const knox = require('knox');

let secrets;

var db = spicedPg(process.env.DATABASE_URL || `postgres:${require('../secrets.json').name}:${require('../secrets.json').pass}@localhost:5432/fleamarket`);

if (process.env.NODE_ENV == 'production') {
    secrets = process.env;
} else {
    secrets = require('../secrets.json');
}

const client = knox.createClient({
    key: secrets.AWS_KEY || process.env.AWS_KEY,
    secret: secrets.AWS_SECRET || process.env.AWS_SECRET,
    bucket: 'inasfleamarket'
});




function hashPassword(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}


function addUserData(userName, email, hash) {
    return db.query('INSERT INTO users(userName, email, password) values($1, $2, $3) returning id', [userName, email, hash]);
}


function getUserData(email) {
    return db.query('SELECT * FROM users WHERE email=$1', [email]);
}


function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
}


function sendFile(file) {
    return new Promise (function(resolve, reject) {

        const s3Request = client.put(file.filename, {
            'Content-Type': file.mimetype,
            'Content-Length': file.size,
            'x-amz-acl': 'public-read'
        });

        const readStream = fs.createReadStream(file.path);
        readStream.pipe(s3Request);

        s3Request.on('response', (s3Response) => {

            if (s3Response.statusCode == 200) {
                console.log('jee');
                resolve();
            } else {
                console.log('noouuu!');
                reject();
            }
        });
    });
}


function addImgToDb(image, id) {
    return new Promise (function(resolve, reject) {
        db.query ('UPDATE users SET image=$1 WHERE id=$2',[image, id]);
    }).catch(function(err) {
        console.log(err);
    });
}


function addImgToItemsDb(image, id) {
    return new Promise (function(resolve, reject) {
        db.query ('INSERT INTO items(image, user_id) values($1, $2)',[image, id]);
    }).catch(function(err) {
        console.log(err);
    });
}



module.exports.hashPassword = hashPassword;
module.exports.addUserData = addUserData;
module.exports.getUserData = getUserData;
module.exports.checkPassword = checkPassword;
module.exports.sendFile = sendFile;
module.exports.addImgToDb = addImgToDb;
module.exports.addImgToItemsDb = addImgToItemsDb;
