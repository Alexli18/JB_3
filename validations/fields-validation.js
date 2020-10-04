const _ = require('lodash');

const fieldValidation = (req,res,next,FIELDS) => {
    const fields = Object.keys(req.body);
    const fieldExists = _.size(_.difference(FIELDS, fields)) === 0;
    const isValidFieldsValues = Object.values(req.body).every(x => !!x);
    if (fieldExists && isValidFieldsValues) {
        return next();
    }
    return res.sendStatus(400);
}


module.exports = {
    fieldValidation
}