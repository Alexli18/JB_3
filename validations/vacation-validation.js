const _ = require('lodash');
const {
    VACATION_FIELDS,
    VACATION_DELETE_BY,
    VACATION_EDIT_FIELDS
} = require('../utils/index');
const { fieldValidation } = require('./fields-validation');



const addVacationValidation = async (req, res, next) => {
    // const fields = Object.keys(req.body);
    // const fieldExists = _.size(_.difference(VACATION_FIELDS, fields)) === 0;
    // const isValidFieldsValues = Object.values(req.body).every(x => !!x);
    // if (fieldExists && isValidFieldsValues) {
    //     return next();
    // }
    // return res.sendStatus(400);
    try {
        await fieldValidation(req, res, next, VACATION_FIELDS);
    } catch (err) {
        res.sendStatus(400)
    }
}

const deleteVacationValidation = async (req, res, next) => {
    try {
        await fieldValidation(req, res, next, VACATION_DELETE_BY);
    } catch (err) {
        res.sendStatus(400)
    }
}

const editVacationValidation = async (req, res, next) => {
    try {
        await fieldValidation(req, res, next, VACATION_EDIT_FIELDS);
    } catch (err) {
        res.sendStatus(400)
    }
}

module.exports = {
    addVacationValidation,
    deleteVacationValidation,
    editVacationValidation
}