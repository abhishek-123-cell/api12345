const express = require('express');
const path = require('path');
const port=8000;
const app = express();
const db = require('./config/mongoose');
const AppError = require('./config/AppError');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');

const session = require('express-session');
const passport = require('passport');
const jwtPassport = require('./config/passport-jwt-strategy');

const sassMiddleware = require('node-sass-middleware');

app.enable('trust proxy');


  app.use(
    sassMiddleware({
      src: path.join(__dirname, 'assets', 'scss'),
      dest: path.join(__dirname, 'assets', 'css'),
      debug: true,
      outputStyle: 'extended',
      prefix: '/css',
    })
  );



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(passport.initialize());
app.use(passport.session());

app.use(compression());

app.use('/', require('./routes'));

// app.use(globalErrorHandler);
app.listen(port,()=>{
  console.log('my server is running at a port=',port)
})

