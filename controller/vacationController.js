const express = require('express');
const router = express.Router();

// validations
const { addVacationValidation, editVacationValidation, deleteVacationValidation } = require('../validations/vacation-validation');

// services
const { addVacation, deleteVacation, editVacation } = require('../services/vacation-service');


router.post('/addVacation', addVacationValidation, async (req,res)=>{
    const { description, destination, img, start_date, finish_date, price } = req.body;
    try{
        await addVacation({ description, destination, img, start_date, finish_date, price });
        res.sendStatus(200);
    }catch(err){ res.sendStatus(400) }
});

router.delete('/deleteVacation', deleteVacationValidation, async (req,res)=>{
    const { id } = req.body;
    try{
        await deleteVacation({id});
        res.sendStatus(200);
    }catch(err){ res.sendStatus(400) }
});

router.post('/editVacation', editVacationValidation, async (req, res)=>{
    const { description, destination, img, start_date, finish_date, price, id } = req.body;
    try{
        await editVacation({description, destination, img, start_date, finish_date, price, id});
    }catch(err){ res.sendStatus(400) }
})

module.exports = router;