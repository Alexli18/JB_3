const express = require('express');
const router = express.Router();
const { getAllVacations } = require('../services/vacation-service');


// no need to validate this, couse app.use('*', isValid);
router.get('/', async (req, res)=> {
    try{
        const vacations = await getAllVacations();
        const vacationsData = vacations[0][0];
        res.send(vacationsData);
    }catch(err){
        res.sendStatus(400)
    }
})



module.exports = router;