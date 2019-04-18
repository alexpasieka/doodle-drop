// import models
const models = require('../models');

// referencing doodle model
const Doodle = models.Doodle;

// get all uploaded doodles and display them on home page
const homePage = (req, res) => {
  Doodle.DoodleModel.findAll((err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error occurred.' });
    }

    // checking if the user is logged in or not
    let loggedIn = false;
    if (req.session.account !== undefined) {
      loggedIn = true;
    }

    return res.render('home', { doodles: docs, loggedIn });
  });
};

// get all doodles uploaded by user and display them on user page
const userPage = (req, res) => {
  Doodle.DoodleModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.render('user', { doodles: docs });
  });
};

// display upload doodle page
const uploadPage = (req, res) => {
  res.render('upload');
};

// upload new doodle
const upload = (req, res) => {
  // make sure all required fields are filled out
  if (!req.body.title || !req.body.image || !req.body.description) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // new doodle data
  const doodle = {
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    owner: req.session.account._id,
  };

  // create new doodle
  const newDoodle = new Doodle.DoodleModel(doodle);

  // start promise by saving new doodle to database
  const doodlePromise = newDoodle.save();

  // reload user page once new doodle is saved
  doodlePromise.then(() => res.json({ redirect: '/user' }));

  // error checking promise
  doodlePromise.catch((err) => {
    // user can't upload an identical doodle
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Doodle already exists.' });
    }

    // handle any other errors
    return res.status(400).json({ error: 'An error occurred.' });
  });

  return doodlePromise;
};

const pageNotFound = (req, res) => {
  res.redirect('/');
};

// module exports
module.exports = {
  homePage,
  userPage,
  uploadPage,
  upload,
  pageNotFound,
};
