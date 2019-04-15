// import libraries
const path = require('path');
const url = require('url');
const mongoose = require('mongoose');
const express = require('express');
const handlebars = require('express-handlebars');
const favicon = require('serve-favicon');
const compression = require('compression');
const bodyParser = require('body-parser');
const session = require('express-session');
const Redis = require('connect-redis')(session);
const cookieParser = require('cookie-parser');

// connect to MongoDB using mongoose
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/doodle-drop';
mongoose.connect(dbURL, (err) => {
  if (err) {
    throw err;
  }
});

// connect to Redis
let redisURL = {
  hostname: 'localhost',
  port: 6379,
};
let redisPassword;
if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPassword = redisURL.auth.split(':')[1];
}

// define express app
const app = express();
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.disable('x-powered-by');
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  key: 'sessionid',
  store: new Redis({
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPassword,
  }),
  secret: 'Doodle Drop',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));
app.use(cookieParser());

// utilize router
const router = require('./router.js');
router(app);

// listen to port
const port = process.env.PORT || process.env.NODE_PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
});
