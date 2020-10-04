const { fieldValidation } = require('./fields-validation')
const { LOGIN_FIELDS, USER_FIELDS } = require('../utils/index');

const loginValidation = async (req, res, next) => {
    try{
        await fieldValidation(req, res, next, LOGIN_FIELDS);
    }catch(err){ res.sendStatus(400) }
}

const signupValidation = async (req, res, next) => {
    try{
        await fieldValidation(req, res, next, USER_FIELDS);
    }catch(err){ res.sendStatus(400) }
}

module.exports = {
    loginValidation,
    signupValidation
}