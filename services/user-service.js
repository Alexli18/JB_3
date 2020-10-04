const {createHashedPassword} = require('./user-utils');
const CREATE_NEW_USER = 'INSERT INTO `users`(`first_name`, `last_name`, `username`, `password`, `isAdmin`) VALUES (?,?,?,?,?)';
const IS_USER_EXIST_RESTORE = 'SELECT * FROM `users` WHERE `first_name` = ? AND `last_name` = ? AND `username`= ?';
const UPDATE_PASS = 'UPDATE `users` SET `password`= ? WHERE `username` = ? AND `first_name` = ? AND `last_name` = ?'

const updatePass = ({new_pass, username, first_name, last_name}) => global.mysqlConnection.execute(UPDATE_PASS, [createHashedPassword(new_pass), username, first_name, last_name])


const isUserExistRestore = ({first_name, last_name, username}) => {
    return global.mysqlConnection.execute(IS_USER_EXIST_RESTORE, [first_name, last_name, username])
    .then(data => {
        const user = data[0][0];
        if (user) {
            return true;
        }
        return false;
     }).catch(err => {
         return console.log(err);
     });
}

const createUser = ({first_name, last_name, username, password}) => global.mysqlConnection.execute(CREATE_NEW_USER, [first_name, last_name, username, createHashedPassword(password), false]);

const isUserExist = ({username, password}) => {
    return global.mysqlConnection.execute('select * from users where username = ? and password = ?',[username, createHashedPassword(password)])
    .then(data => {
       const user = data[0][0];
       if (user) {
           return true;
       }
       return false;
    }).catch(err => {
        return console.log(err);
    });
}

module.exports = {
    createUser,
    isUserExist,
    isUserExistRestore,
    updatePass
    };