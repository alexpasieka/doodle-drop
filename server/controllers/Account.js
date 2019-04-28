// import models
const models = require('../models');

// reference account model
const Account = models.Account;

// display log in/sign up page
const logInPage = (req, res) => {
  res.render('login');
};

// user log in
const logIn = (request, response) => {
  const req = request;
  const res = response;

  // make sure all fields are filled out
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // authenticate user
  return Account.AccountModel.authenticate(req.body.username, req.body.password, (err, account) => {
    // wrong credentials
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password.' });
    }

    // initialize account session
    req.session.account = Account.AccountModel.toAPI(account);

    // redirect to user page
    return res.json({ redirect: '/user' });
  });
};

// user sign up
const signUp = (request, response) => {
  const req = request;
  const res = response;

	// make sure all fields are filled out
  if (!req.body.username || !req.body.password || !req.body.password2) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // make sure both passwords match
  if (req.body.password !== req.body.password2) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  // generate hash for user's password
  return Account.AccountModel.generateHash(req.body.password, (salt, hash) => {
    // new account data
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

		// create new account
    const newAccount = new Account.AccountModel(accountData);

		// start promise by saving new account to database
    const savePromise = newAccount.save();

		// reload user page once new account is saved
    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/user' });
    });

		// error checking promise
    savePromise.catch((err) => {
			// user can't create an identical account
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

			// handle any other errors
      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

// display change password page
const changePasswordPage = (req, res) => res.render('change-password',
  { loggedIn: true, username: req.session.account.username });

// change user password
const changePassword = (request, response) => {
  const req = request;
  const res = response;

	// make sure all fields are filled out
  if (!req.body.newPassword || !req.body.newPassword2) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

	// make sure both passwords match
  if (req.body.newPassword !== req.body.newPassword2) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

	// generate hash for user's new password
  return Account.AccountModel.generateHash(req.body.newPassword, (salt, hash) => {
    // update user's password
    const updatePromise = Account.AccountModel.updateOne({ _id: req.session.account._id },
      {
        salt,
        password: hash,
      });

    // redirect to user page once password changed
    updatePromise.then(res.json({ redirect: '/user' }));
  });
};

// when user logs out, end the active session and redirect back to home page
const logOut = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// module exports
module.exports = {
  logInPage,
  logIn,
  signUp,
  changePasswordPage,
  changePassword,
  logOut,
};
