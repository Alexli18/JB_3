const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2/promise');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const {localStrategyHandler, serializeUser, deserializeUser, isValid, isAdmin} = require('./passport');
const {dbConfig, cookieConfig, sessionSecret} = require('./config');
const vacationController = require('./controller/vacationController');
const loginController = require('./controller/loginController');
const fetchVacationsController = require('./controller/fetchVacationController');
const cors = require('cors')

passport.use('local', new LocalStrategy(localStrategyHandler));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(dbConfig),
    cookie: cookieConfig
  }));

app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static('public'));

app.use(cors());

app.use('/auth', loginController);
app.use('*', isValid);
app.use('/fetchVacations', fetchVacationsController)


//////////////////////////////////
// FOR ADMIN
/////////////////////////////////
app.use('*', isAdmin);
app.use('/api', vacationController);

mysql.createConnection(dbConfig).then(connection => {
      global.mysqlConnection = connection;
      app.listen(4100, () => {
            console.log(`app is on port 4100`);
      });
  });
