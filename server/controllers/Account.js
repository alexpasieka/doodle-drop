// import models
const models = require('../models');

// referencing account model
const Account = models.Account;

// display login/signup page
const loginPage = (req, res) => {
  res.render('login');
};

// user login
const login = (request, response) => {
  const req = request;
  const res = response;

	// force cast to string to cove some security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.password}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/user' });
  });
};

// user signup
const signup = (request, response) => {
  const req = request;
  const res = response;

	// cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.password = `${req.body.password}`;
  req.body.password2 = `${req.body.password2}`;

  if (!req.body.username || !req.body.password || !req.body.password2) {
    return res.status(400).json({ error: 'RAWR! All fields are required' });
  }

  if (req.body.password !== req.body.password2) {
    return res.status(400).json({ error: 'RAWR! Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.password, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/user' });
    });

    savePromise.catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

const changePasswordPage = (req, res) => {
  res.render('change-password');
};

const changePassword = (request, response) => {
  const req = request;
  const res = response;

  if (!req.body.newPassword || !req.body.newPassword2) {
    res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.newPassword !== req.body.newPassword2) {
    res.status(400).json({ error: 'Passwords do not match' });
  }

  Account.AccountModel.generateHash(req.body.newPassword, (salt, hash) => {
    const updatePromise = Account.AccountModel.updateOne({ _id: req.session.account._id },
      {
        salt,
        password: hash,
      });

    updatePromise.then(res.redirect('/user'));
  });
};

// when a user logs out, end the active session and redirect back to the home page
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// module exports
module.exports = {
  loginPage,
  login,
  signup,
  changePasswordPage,
  changePassword,
  logout,
};
