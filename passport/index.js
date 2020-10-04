const {createHashedPassword} = require('../services/user-utils');

module.exports = {
    localStrategyHandler: (username, password, done) => {
        global.mysqlConnection.execute('select * from users where username = ? and password = ?',[username, createHashedPassword(password)])
         .then(data => {
            const user = data[0][0];
            if (!user) {
                return done(null, false);
            }
            console.log(user)
            return done(null, user);
         }).catch(err => {
             return done(err);
         });
    },
    serializeUser: (user, done) => {
        done(null, user);
    },
    deserializeUser: (user, done) => {
        done(null, user);
    },
    isValid: (req, res, next) => {
        if (req.isAuthenticated()) {
            console.log(req.user);
            return next();
        }
        return res.sendStatus(401);
    },
    // add admin validation to specific api`s
    isAdmin: (req, res, next) => {
        // req have req.user.isAdmin field
        if (req.user.isAdmin){
            console.log('this user admin')
            return next()
        }
        console.log('this user NOT admin')
        return res.sendStatus(401)
    }
}