// import models
const models = require('../models');

// reference doodle model
const Doodle = models.Doodle;

// get all posted doodles and display them on home page
const homePage = (req, res) => {
  Doodle.DoodleModel.findAll((err, docs) => {
    // error check
    if (err) {
      return res.status(400).json({ error: 'An error occurred.' });
    }

		// if the user is logged in, pass their username over to the view
    let loggedIn = false;
    let username = '';
    if (req.session.account !== undefined) {
      loggedIn = true;
      username = req.session.account.username;
    }
    return res.render('home', { doodles: docs, loggedIn, username });
  });
};

// get all doodles posted by logged in user and display them on user page
const userPage = (req, res) => {
  Doodle.DoodleModel.findByOwner(req.session.account._id, (err, docs) => {
		// error check
    if (err) {
      return res.status(400).json({ error: 'An error occurred.' });
    }

		// pass username over to the view
    return res.render('user', { doodles: docs, loggedIn: true, username: req.session.account.username });
  });
};

// display page for drawing new doodles
const drawPage = (req, res) =>
	// pass username over to the view
	 res.render('draw', { loggedIn: true, username: req.session.account.username });

// post new doodle
const postDoodle = (req, res) => {
	// new doodle data
  const doodle = {
    image: req.body.image,
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
		// user can't post an identical doodle
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Doodle already exists.' });
    }

		// handle any other errors
    return res.status(400).json({ error: 'An error occurred.' });
  });

  return doodlePromise;
};

// delete specified doodle
const deleteDoodle = (req, res) => {
  Doodle.DoodleModel.deleteOne({ _id: req.body._id }, (err) => {
    // error check
    if (err) {
      return res.status(400).json({ error: 'An error occurred.' });
    }

    // reload user page
    return res.redirect('/user');
  });
};

// redirect to home page if user goes to unknown page
const pageNotFound = (req, res) => {
  res.redirect('/');
};

// module exports
module.exports = {
  homePage,
  userPage,
  drawPage,
  postDoodle,
  deleteDoodle,
  pageNotFound,
};
