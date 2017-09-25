const spicedPg = require('spiced-pg');
const bcrypt = require('bcryptjs');
let secrets;

var db = spicedPg(process.env.DATABASE_URL || `postgres:${require('../secrets.json').name}:${require('../secrets.json').pass}@localhost:5432/fleamarket`);

if (process.env.NODE_ENV == 'production') {
    secrets = process.env;
} else {
    secrets = require('../secrets.json');
}


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



module.exports.hashPassword = hashPassword;
module.exports.addUserData = addUserData;
module.exports.getUserData = getUserData;
module.exports.checkPassword = checkPassword;
