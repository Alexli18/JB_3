const express = require('express');
const router = express.Router();
const passport = require('passport');
//services
const { createUser, isUserExist, isUserExistRestore, updatePass } = require('../services/user-service');
//validators
const { loginValidation, signupValidation } = require('../validations/auth-validation');

router.post('/login', loginValidation, (req, res, next)=>{
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login.html'); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          // return here if user authed
          return res.send(user)
        });
      })(req, res, next);
});

router.post('/signup', signupValidation, async (req, res, next)=>{
  const {first_name, last_name, username, password} = req.body;
  // check if user exist 
  try{
    const isExist =  await isUserExist({username, password})
    if(isExist == false){
      createUser({first_name, last_name,username, password});
      res.sendStatus(200);
    }else{  
      res.json({
        mess: "this user already exist"
      })
    }
  }catch(err){ res.sendStatus(400) }
})

router.post('/restore', async (req, res)=>{
  const { username, first_name, last_name, new_pass } = req.body;
  try{
    const isUserValidToRestore = await isUserExistRestore({first_name, last_name, username});
    if(isUserValidToRestore == true){
      await updatePass({new_pass, username, first_name, last_name})
      res.sendStatus(200)
    }
  }catch(err){ res.sendStatus(400) }
})


router.get('/logout', (req, res, next) => {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;